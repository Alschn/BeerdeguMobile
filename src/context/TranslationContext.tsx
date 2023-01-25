import i18njs, { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import Storage from "@react-native-async-storage/async-storage";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import translations from "../i18n";

const i18n = new I18n();

interface ITranslate {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
  t: (scope: i18njs.Scope, options?: i18njs.TranslateOptions) => string;
  translate: (scope: i18njs.Scope, options?: i18njs.TranslateOptions) => string;
}

const TranslationContext = createContext<ITranslate>({} as ITranslate);

interface TranslationContextProviderProps {
  children: ReactNode;
}

const TranslationContextProvider: FC<TranslationContextProviderProps> = ({
  children,
}) => {
  const [locale, setLocale] = useState<string>("en");

  i18n.locale = locale;
  i18n.translations = translations;
  i18n.enableFallback = true;

  const t = useCallback(
    (scope: i18njs.Scope, options?: i18njs.TranslateOptions) => {
      return i18n.t(scope, { ...options, locale });
    },
    [locale]
  );

  const getLocale = useCallback(async () => {
    const localeJSON = await Storage.getItem("locale");
    setLocale(localeJSON !== null ? localeJSON : Localization.locale);
  }, [setLocale]);

  useEffect(() => {
    getLocale();
  }, [getLocale]);

  useEffect(() => {
    Storage.setItem("locale", locale);
  }, [locale]);

  return (
    <TranslationContext.Provider
      value={{
        t,
        locale,
        setLocale,
        translate: t,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);

export default TranslationContextProvider;
