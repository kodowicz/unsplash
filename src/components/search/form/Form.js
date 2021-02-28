import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  useKeyPress,
  useFetchSuggestions,
  useOnClickOutside,
  useDebounce
} from '../../../hooks/';
import { ReactComponent as SearchSvg } from '../../../assets/search.svg';
import { ReactComponent as ResetSvg } from '../../../assets/reset.svg';
import styles from './form.module.scss';

export default function Form() {
  const { id } = useParams();
  const history = useHistory();
  const inputRef = useRef();
  const listRef = useRef();
  const [ option, setOption ] = useState(-1);
  const [ value, setValue ] = useState('');
  const [ hasFocus, setFocus ] = useState(false);
  const debouncedValue = useDebounce(value, 300);
  const suggestions = useFetchSuggestions(debouncedValue);
  const arrowDownPress = useKeyPress('ArrowDown');
  const arrowUpPress = useKeyPress('ArrowUp');
  const addStyles = id ? styles.minor : styles.major;

  useOnClickOutside(
    () => {
      setFocus(false)
    },
    [listRef, inputRef]
  );

  useEffect(() => setValue(''), [id]);

  useEffect(
    () => {
      const maxOption = suggestions?.length - 1;
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
    const suggestion = suggestions && suggestions[option]?.query;
    const query = id || suggestion || value;

    if (!query) return;
    history.push(`/s/photos/${query}/`)
  }

  const searchButton = (
    <button
      className={`${styles.search} ${addStyles}`}
      title='Search Unsplash'
      type='submit'
      onClick={searchPhotos}
    >
      <SearchSvg />
    </button>
  )

  const resetButton = (
    <button
      hidden={!value}
      className={`${styles.reset} ${addStyles}`}
      onClick={resetQuery}
    >
      <ResetSvg />
    </button>
  )

  const visibleSuggestions = hasFocus && suggestions && value.length >= 3;
  let listItems = <></>;

  if (visibleSuggestions) {
    if (suggestions.length) {
      listItems = suggestions.map((suggestion, index) => (
        <li
          key={index}
          className={styles.item}
          aria-selected={option === index}
          id={`autocomplete-search--item-${index}`}
          role='option'
          onMouseEnter={() => setOption(index)}
          onClick={(event) => searchPhotos(event, suggestion.query)}
        >
          <div>{suggestion.query}</div>
        </li>
      ));

    } else {
      listItems = (
        <li
          className={styles.item}
          role='option'
          aria-selected='false'
          id='autocomplete-search--item-0'
        >
          <div>no matching photos</div>
        </li>
      )
    }
  }

  let listbox = (
    <div
      ref={listRef}
      className={`${styles.listbox} ${!visibleSuggestions && styles.hidden}`}
      role='listbox'
      id='autocomplete-search'
    >
      <ul className={styles.list} role='listbox'>
        {listItems}
      </ul>
    </div>
  );

  return (
    <form
      className={`${styles.form} ${addStyles}`}
      onSubmit={searchPhotos}
    >
      {searchButton}
      <div
        className={styles.combobox}
        aria-expanded={visibleSuggestions}
        role='combobox'
        aria-haspopup='listbox'
        aria-owns='autocomplete-search'
      >
        <input
          value={value}
          ref={inputRef}
          className={styles.input}
          aria-activedescendant={option > -1 && `autocomplete-search--item-${option}`}
          onChange={changeQuery}
          onFocus={() => setFocus(true)}
          type='search'
          autoComplete='off'
          aria-autocomplete='list'
          aria-controls='autocomplete-search'
          name='searchKeyword'
          placeholder='Search photos'
          title='Search Unsplash'
          autoCapitalize='none'
          spellCheck='false'
          required
        />
        {listbox}
      </div>
      {resetButton}
    </form>
  )
}
