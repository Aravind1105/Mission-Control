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
  ...props
}) => {
  const containerRef = useRef(null);
  outsideClickHandler(containerRef, () => setOptionsVisible(false));

  const isTouched = form.touched[field.name];
  const error = form.errors[field.name] && form.errors[field.name].value;
  const errMsg = isTouched && error ? { content: error } : undefined;

  const [text, changeText] = useState((field.value && field.value.label) || '');
  const [isOptionSelected, setIsOptionSelected] = useState(true);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

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
  }, [text, options]);

  return (
    <div
      className="livello-dropdown-container"
      ref={containerRef}
      onClick={() => setOptionsVisible(!optionsVisible)}
    >
      <Input
        icon="angle down"
        className="livello-dropdown-input"
        // as="input"
        // autocomplete="off"
        {...field}
        placeholder={placeholder}
        onChange={(e, { value }) => {
          setIsOptionSelected(false);
          changeText(value);
        }}
        error={errMsg}
        value={text}
        // onkeyup={() => alert()}
      />
      <div
        className={
          optionsVisible
            ? 'livello-dropdown-options-view'
            : 'livello-dropdown-options-view livello-dropdown-options-view-hidden'
        }
      >
        {filteredOptions.length > 0 &&
          filteredOptions.map(option => (
            <div
              className={
                text === option.label
                  ? 'livello-dropdown-options-item livello-dropdown-options-item-selected'
                  : 'livello-dropdown-options-item'
              }
              onClick={() => {
                form.setFieldValue(field.name, option);
                setIsOptionSelected(true);
                changeText(option.label);
                if (onChange) {
                  onChange(option.value);
                }
                setFilteredOptions(options);
              }}
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
