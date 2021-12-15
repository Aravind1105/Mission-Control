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
  disabled,
}) => {
  const containerRef = useRef(null);
  outsideClickHandler(containerRef, () => {
    setOptionsVisible(false);
    resetHoverIndex();
  });

  const resetHoverIndex = () => setHoverIndex(-1);

  const setFormFieldValue = optionObject => {
    form.setFieldValue(field.name, optionObject);
    // this is just a work around to fix the two times selection of an option to hide the error message
    setTimeout(() => form.setFieldValue(field.name, optionObject), 100);
  };

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
      if (text === '') {
        setFormFieldValue('');
      }
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
        handleOptionSelection(filteredOptions[hoverIndex], true);
      }
    }
    setHoverIndex(index);

    if (!optionsVisible) {
      setOptionsVisible(true);
    }
  };

  const handleOptionSelection = (option, isEnterKeyPress) => {
    setFormFieldValue(option);
    setIsOptionSelected(true);
    changeText(option.label);
    if (onChange) {
      onChange({
        fieldName: field.name,
        data: option,
        setFieldValue: form.setFieldValue,
      });
    }
    if (isEnterKeyPress) {
      setOptionsVisible(false);
    }
    setFilteredOptions(options);
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
        disabled={disabled}
        onBlur={event => {
          event.preventDefault();
        }}
      />
      <div
        className={
          !disabled && optionsVisible
            ? 'livello-dropdown-options-view'
            : 'livello-dropdown-options-view livello-dropdown-options-view-hidden'
        }
      >
        {!disabled &&
          filteredOptions.length > 0 &&
          filteredOptions.map((option, index) => (
            <div
              className={
                text === option.label
                  ? 'livello-dropdown-options-item livello-dropdown-options-item-selected'
                  : hoverIndex === index
                  ? 'livello-dropdown-options-item livello-dropdown-options-item-hover'
                  : 'livello-dropdown-options-item'
              }
              onClick={() => handleOptionSelection(option, false)}
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
