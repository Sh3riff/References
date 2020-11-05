const LanguageSelector = () => {
    const { t, i18n } = useTranslation()
  
  
    const changeLanguage = (e) => {
      i18n.changeLanguage(e.target.value)
    }
  
    return (
      <div onChange={changeLanguage}>
        <input type="radio" value="en" name="language" defaultChecked /> English
        <input type="radio" value="zh-hk" name="language"/> Traditional Chinese
      </div>
    )
  }