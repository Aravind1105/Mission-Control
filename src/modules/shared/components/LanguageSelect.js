import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Flag } from 'semantic-ui-react';
import { getLanguage } from 'core/selectors/coreSelectors';
import { changeLanguageSaga } from 'core/actions/i18nActions';

const supportedLanguages = ['en', 'de', 'pt'];

const Language = ({ lng = 'en' }) => {
  const f = lng === 'en' ? 'us' : lng;
  return (
    <>
      <Flag name={f.toLowerCase()} /> {lng.toUpperCase()}
    </>
  );
};

const LanguageSelectItem = ({ changeLanguage, disabled, lng }) => (
  <Dropdown.Item onClick={() => changeLanguage(lng)} disabled={disabled}>
    <Language lng={lng} />
  </Dropdown.Item>
);

const LanguageSelect = ({ changeLanguage, currentLanguage }) => {
  return (
    <Dropdown
      trigger={<Language lng={currentLanguage} />}
      pointing
      icon={false}
    >
      <Dropdown.Menu>
        {supportedLanguages.map(language => (
          <LanguageSelectItem
            key={language}
            lng={language}
            changeLanguage={changeLanguage}
            disabled={language === currentLanguage}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const mapStateToProps = state => ({
  currentLanguage: getLanguage(state),
});

const mapDispatchToProps = dispatch => ({
  changeLanguage: lng => dispatch(changeLanguageSaga(lng)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageSelect);
