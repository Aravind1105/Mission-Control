import React, { useState, useEffect, useRef } from 'react';
import './styles.less';
import { Input, Button, Checkbox, Icon, Loader } from 'semantic-ui-react';

const ICONS = {
  DOWN: 'caret down',
  SEARCH: 'search',
  CLOSE: 'close',
};

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

const SelectCheckBoxes = ({
  title,
  options,
  allOptionKey,
  onClickApply,
  value = [],
  isLoading,
}) => {
  const containerRef = useRef(null);
  outsideClickHandler(containerRef, () => setOptionsVisible(false));

  const [icon, setIcon] = useState(ICONS.DOWN);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedValues, setSelectedValues] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (optionsVisible) {
      setIcon(ICONS.SEARCH);
    } else if (selectedValues.length > 0) {
      setSearchText('');
      setIcon(ICONS.CLOSE);
    } else {
      setSearchText('');
      setIcon(ICONS.DOWN);
    }
  }, [optionsVisible]);

  // selecting or deselecting All Option. Example: All Kiosks
  useEffect(() => {
    if (selectedValues.length > 0) {
      if (
        options.length - 1 === selectedValues.length &&
        selectedValues.indexOf(allOptionKey) === -1
      ) {
        setSelectedValues([...selectedValues, allOptionKey]);
      } else if (
        selectedValues.length === 1 &&
        selectedValues[0] === allOptionKey
      ) {
        setSelectedValues([]);
      }
    }

    if (selectedValues.length === 0 && !optionsVisible) {
      setIcon(ICONS.DOWN);
    }
  }, [selectedValues]);

  // filter options
  useEffect(() => {
    if (searchText !== '') {
      setFilteredOptions(
        options.filter(
          option =>
            option.text.toLowerCase().indexOf(searchText.toLowerCase()) !==
              -1 && option.key !== allOptionKey,
        ),
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchText, options]);

  if (isLoading) return <Loader active inline="centered" />;

  return (
    <div className="select-checks-container" ref={containerRef}>
      <div onClick={() => setOptionsVisible(!optionsVisible)}>
        <Input
          icon={
            <Icon
              name={icon}
              link={icon === ICONS.CLOSE}
              onClick={event => {
                setSelectedValues([]);
                event.stopPropagation(); // to stop opening of the options
                // call the apply handler to handle the callback in the parent
                onClickApply([]);
              }}
            />
          }
          value={
            optionsVisible
              ? searchText
              : selectedValues.length > 0
              ? `${title} (${selectedValues.length})`
              : `All ${title}`
          }
          className={
            optionsVisible
              ? 'select-check-input-options-enabled'
              : 'select-check-input-cursor-disabled'
          }
          onChange={({ target }) => {
            if (optionsVisible) {
              setSearchText(target.value);
            } else {
              setSearchText('');
            }
          }}
          placeholder="Type to Search"
        />
      </div>
      {optionsVisible && (
        <div className="select-checks-options-view">
          <div className="select-checks-options-container">
            {filteredOptions.map(option => (
              <div className="select-checkbox-option">
                <Checkbox
                  label={option.text}
                  value={option.value}
                  key={option.key}
                  checked={selectedValues.indexOf(option.key) !== -1}
                  onChange={() => {
                    const idx = selectedValues.indexOf(option.key);
                    if (option.key === allOptionKey) {
                      if (filteredOptions.length === selectedValues.length) {
                        // if all the options are ALREADY selected, deselect all of them
                        setSelectedValues([]);
                      } else {
                        // if all option is selected, add all the keys to the selected values
                        const allKeys = [];
                        filteredOptions.forEach(option => {
                          // add the key only if it is not available in the selected values
                          if (selectedValues.indexOf(option.key) === -1) {
                            allKeys.push(option.key);
                          }
                        });
                        setSelectedValues([...selectedValues, ...allKeys]);
                      }
                    } else {
                      if (idx === -1) {
                        // if key is not in the selected values, add it
                        setSelectedValues([...selectedValues, option.key]);
                      } else {
                        // remove key if it is available in the selected values
                        setSelectedValues(
                          selectedValues.filter(
                            item =>
                              item !== option.key && item !== allOptionKey,
                          ),
                        );
                      }
                    }
                  }}
                />
                <br />
              </div>
            ))}
          </div>
          <div className="select-checks-options-divider" />
          <div className="select-check-options-footer">
            <Button
              className="select-checks-footer-btn select-checks-footer-btn-left custom-button-cancel"
              onClick={() => setSelectedValues([])}
            >
              Clear
            </Button>
            <Button
              className="select-checks-footer-btn custom-button-confirm"
              onClick={() => {
                onClickApply(
                  selectedValues.filter(value => value !== allOptionKey),
                );
                setOptionsVisible(false);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectCheckBoxes;
