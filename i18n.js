// React example

//i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next"; 
import Backend from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";

export default i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    whitelist: ["en", "fr"],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

//App.js
import React, { Suspense } from "react";
import "./languages/i18n";
import { useTranslation } from 'react-i18next';

function MyComponent() {
    const { t, i18n } = useTranslation(['translation', 'reactworld']);;
  
    const handleClick = (lang) => i18n.changeLanguage(lang)
  
    return (
      <nav className="nav nav-pills nav-stacked">
        <nav
          style={{
            width: "100%",
            padding: "2rem 0",
            backgroundColor: "gray",
            textAlign: "center",
          }}
        >
          <button
            type="button"
            onClick={() => handleClick("en")}
            className="btn btn-primary m-4"
          >
            English
          </button>
          <button
            type="button"
            onClick={() => handleClick("fr")}
            className="btn btn-success m-4"
          >
            French
          </button>
        </nav>
        <div className="container center">
          <h1>{t("translation:text1.t")} </h1>
          <p>{t("translation:text2.t")} </p>
          <p>{t("reactworld:title")} </p>
        </div>
    </nav>
    )
  }

  function App() {
    return (
        <Suspense fallback={<Loader />}>
            <MyComponent />
        </Suspense>
    );
  }
  
  export default App;


////////////// REACT NATIVE /////////////////

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
          hello: 'Hello world',
          change: 'Change language',
        },
      },
      sv: {
        translation: {
          hello: 'Hej världen',
          change: 'Byt språk',
        },
      },
    },
  });

export default function App() {
  const { t, i18n } = useTranslation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>{t('hello')}</Text>

      <TouchableOpacity onPress={() => i18n.changeLanguage(i18n.language === 'sv' ? 'en' : 'sv')}>
        <Text>{t('change')}</Text>
      </TouchableOpacity>
    </View>
  );
}



/////////////////  TRANSLATION FUNCTION  ////////////////

//Passing a default value
    i18next.t('key', 'default value to show');

//Interpolation
    { "key": "I am {{author.name}}" } ==> i18next.t('key', { author }); // I am 
    
//Formatting
    {
        "key": "The current date is {{date, MM/DD/YYYY}}",
        "key2": "{{text, uppercase}} just uppercased"
    }

    i18next.init({
        interpolation: {
            format: function(value, format, lng) {
                if (format === 'uppercase') return value.toUpperCase();
                if(value instanceof Date) return moment(value).format(format);
                return value;
            }
        }
    });

    i18next.t('key', { date: new Date() });  // -> "The current date is 07/13/2016"
    i18next.t('key2', { text: 'can you hear me' });  // => "CAN YOU HEAR ME just uppercased"

//Plurals

    {
        "key": "item",
        "key_plural": "items",
        "keyWithCount": "{{count}} item",
        "keyWithCount_plural": "{{count}} items"
    }

    i18next.t('key', {count: 0}); // -> "items"
    i18next.t('key', {count: 1}); // -> "item"
    i18next.t('key', {count: 5}); // -> "items"
    i18next.t('key', {count: 100}); // -> "items"
    i18next.t('keyWithCount', {count: 0}); // -> "0 items"
    i18next.t('keyWithCount', {count: 1}); // -> "1 item"
    i18next.t('keyWithCount', {count: 5}); // -> "5 items"
    i18next.t('keyWithCount', {count: 100}); // -> "100 items"


// Nesting

    {
        "nesting1": "1 $t(nesting2)",
        "nesting2": "2 $t(nesting3)",
        "nesting3": "3",
    }
    i18next.t('nesting1'); // -> "1 2 3"

    {
        "girlsAndBoys": "$t(girls, {\"count\": {{girls}} }) and {{count}} boy",
        "girlsAndBoys_plural": "$t(girls, {\"count\": {{girls}} }) and {{count}} boys",
        "girls": "{{count}} girl",
        "girls_plural": "{{count}} girls"
    }
    i18next.t('girlsAndBoys', {count: 2, girls: 3}); // -> "3 girls and 2 boys"

    {
        "key1": "hello world",
        "key2": "say: {{val}}"
    }
    i18next.t('key2', {val: '$t(key1)'}); // -> "say: hello world"

//Context

    {
        "friend": "A friend",
        "friend_male": "A boyfriend",
        "friend_female": "A girlfriend"
    }
    i18next.t('friend'); // -> "A friend"
    i18next.t('friend', { context: 'male' }); // -> "A boyfriend"
    i18next.t('friend', { context: 'female' }); // -> "A girlfriend"

    {
        "friend_male": "A boyfriend",
        "friend_female": "A girlfriend",
        "friend_male_plural": "{{count}} boyfriends",
        "friend_female_plural": "{{count}} girlfriends"
    }

    i18next.t('friend', {context: 'male', count: 1}); // -> "A boyfriend"
    i18next.t('friend', {context: 'female', count: 1}); // -> "A girlfriend"
    i18next.t('friend', {context: 'male', count: 100}); // -> "100 boyfriends"
    i18next.t('friend', {context: 'female', count: 100}); // -> "100 girlfriends"