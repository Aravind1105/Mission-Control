import React, { useState, useEffect, useRef } from 'react';
import { FormInput as Input } from 'semantic-ui-react';
import './styles.less';

function outsideClickHandler(ref, callback) {
  useEffect(() => {
    /**
     * callback function will be called when clicked outside
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

const CustomDropdown = ({
  form,
  field,
  placeholder,
  onChange,
  options = [],
}) => {
  const containerRef = useRef(null);
  outsideClickHandler(containerRef, () => {
    setOptionsVisible(false);
    resetHoverIndex();
  });

  const resetHoverIndex = () => setHoverIndex(-1);

  const setFormFieldValue = optionObject =>
    form.setFieldValue(field.name, optionObject);

  const isTouched = form.touched[field.name];
  const error = form.errors[field.name] && form.errors[field.name].value;
  const errMsg = isTouched && error ? { content: error } : undefined;

  const [text, changeText] = useState((field.value && field.value.label) || '');
  const [isOptionSelected, setIsOptionSelected] = useState(true);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [hoverIndex, setHoverIndex] = useState(0);

  // filter options
  useEffect(() => {
    if (!isOptionSelected && text !== '') {
      setFilteredOptions(
        options.filter(
          option =>
            option.label.toLowerCase().indexOf(text.toLowerCase()) !== -1,
        ),
      );
    } else {
      setFilteredOptions(options);
    }
    // reset hover index
    resetHoverIndex();
  }, [text, options]);

  const keyEventHandler = e => {
    e = e || window.event;
    let index = hoverIndex;
    if (e.keyCode == '38') {
      // up arrow
      --index;
      if (index < 0) {
        index = filteredOptions.length - 1;
      }
    } else if (e.keyCode == '40') {
      // down arrow
      ++index;
      if (index > filteredOptions.length - 1) {
        index = 0;
      }
    } else if (e.keyCode == '13') {
      // enter key
      if (hoverIndex !== -1) {
        e.preventDefault();
        const selectedOption = filteredOptions[hoverIndex];
        setFormFieldValue(selectedOption);
        setIsOptionSelected(true);
        changeText(selectedOption.label);
        setOptionsVisible(false);
      }
    }
    setHoverIndex(index);

    if (!optionsVisible) {
      setOptionsVisible(true);
    }
  };

  return (
    <div
      className="livello-dropdown-container"
      ref={containerRef}
      onClick={() => setOptionsVisible(!optionsVisible)}
    >
      <Input
        icon="angle down"
        className="livello-dropdown-input"
        autocomplete="off"
        {...field}
        placeholder={placeholder}
        onChange={event => {
          setIsOptionSelected(false);
          changeText(event.target.value);
        }}
        error={errMsg}
        value={text}
        onKeyDown={keyEventHandler}
        autoComplete="off"
      />
      <div
        className={
          optionsVisible
            ? 'livello-dropdown-options-view'
            : 'livello-dropdown-options-view livello-dropdown-options-view-hidden'
        }
      >
        {filteredOptions.length > 0 &&
          filteredOptions.map((option, index) => (
            <div
              className={
                text === option.label
                  ? 'livello-dropdown-options-item livello-dropdown-options-item-selected'
                  : hoverIndex === index
                  ? 'livello-dropdown-options-item livello-dropdown-options-item-hover'
                  : 'livello-dropdown-options-item'
              }
              onClick={() => {
                setFormFieldValue(option);
                setIsOptionSelected(true);
                changeText(option.label);
                if (onChange) {
                  onChange(option.value);
                }
                setFilteredOptions(options);
              }}
              onMouseOver={() => setHoverIndex(index)}
            >
              <span className="livello-dropdown-options-item-text">
                {option.label}
              </span>
            </div>
          ))}
        {filteredOptions.length === 0 && (
          <div className="livello-dropdown-empty">
            <span className="livello-dropdown-options-item-text">
              No options
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
