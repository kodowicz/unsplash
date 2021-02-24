import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import unsplash from '../../../api/index';
import { useKeyPress, useAutoComplete } from '../../../hooks/';
import { ReactComponent as SearchSvg } from '../../../assets/search.svg';
import { ReactComponent as ResetSvg } from '../../../assets/reset.svg';
import styles from './form.module.scss';

export default function Form() {
  const basicSuggestions = ['islamic', 'islam', 'islamic art', 'island', 'islands', 'islamic articture', 'island wallpapers', 'island in ocean', 'island girl', 'island beach']
  const history = useHistory();
  const inputRef = useRef();
  const enterPress = useKeyPress('Enter');
  const arrowDownPress = useKeyPress('ArrowDown');
  const arrowUpPress = useKeyPress('ArrowUp');
  const [ value, setValue ] = useState('');
  const [ option, setOption ] = useState(-1);
  const [ suggestions ] = useAutoComplete(value, basicSuggestions);

  useEffect(
    () => {
      // fetch(`https://unsplash.com/nautocomplete/${value}`)
      //   .then(res => res.json())
      //   .then(data => setSuggestions(data))
    },
    [value]
  );

  useEffect(
    () => {
      const maxOption = suggestions.length - 1;
      const isFocus = document.activeElement === inputRef.current;

      if (isFocus && value.length >= 3) {
        if (arrowDownPress) {
          if (maxOption === option) {
            setOption(0);
          } else {
            setOption(option + 1);
          }
        } else if (arrowUpPress) {
          if (option === 0) {
            setOption(maxOption)
          } else {
            setOption(option - 1)
          }
        }
      }
    },
    [arrowDownPress, arrowUpPress]
  );

  function resetQuery() {
    setValue('');
    setOption(-1);
  }

  function changeQuery(event) {
    const value = event.target.value;
    setValue(value);
    setOption(-1);
  }

  function searchPhotos(event, id) {
    event.preventDefault();
    const suggestion = suggestions[option];
    const query = id || suggestion || value;

    if (!query) return;
    history.push(`/s/photos/${query}/`)
  };

  return (
    <form className={styles.form} onSubmit={searchPhotos}>
      <button
        className={styles.search}
        title="Search Unsplash"
        type="submit"
      >
        <SearchSvg className={styles.search__svg} />
      </button>
      <div
        className={styles.combobox}
        role="combobox"
        aria-haspopup="listbox"
        aria-owns="autocomplete-search"
        aria-expanded={value.length >= 3}>
        <input
          className={styles.input}
          onChange={changeQuery}
          value={value}
          ref={inputRef}
          type="text"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="autocomplete-search"
          name="searchKeyword"
          placeholder="Search free high-resolution photos"
          title="Search Unsplash"
          autoCapitalize="none"
          spellCheck="false"
          required
        />
        { value.length >= 3 &&
          <div
            className={styles.listbox}
            id="autocomplete-search"
            role="listbox"
          >
            <ul className={styles.listbox__list} role="listbox">
              { suggestions.length ?
                suggestions.map((suggestion, index) => {
                  return (
                    <li
                      key={index}
                      role="option"
                      className={styles.listbox__item}
                      onClick={(event) => searchPhotos(event, suggestion)}
                      id={`autocomplete-search--item-${index}`}
                      aria-selected={option === index}
                      data-suggestion-index={index}>
                      <div>{suggestion}</div>
                    </li>
                  )
                })
                :
                <li
                  role="option"
                  className={styles.listbox__item}
                  id='autocomplete-search--item-0'
                  aria-selected='false'
                  data-suggestion-index='0'>
                  <div>no matching photos</div>
                </li>
              }
            </ul>
          </div>
        }
      </div>
      <button className={styles.reset} hidden={!value} onClick={resetQuery}>
        <ResetSvg className={styles.reset__svg} />
      </button>
    </form>
  )
}
