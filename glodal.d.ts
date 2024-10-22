// Use type safe message keys with `next-intl`
import messages from "./src/dictionaries/en/res_messages.json";
import pages from "./src/dictionaries/en/pages.json";
import forms from "./src/dictionaries/en/forms.json";
import layout from "./src/dictionaries/en/layout.json";
import components from "./src/dictionaries/en/components.json";
import sheets from "./src/dictionaries/en/sheets.json";

type TMessages = { messages: typeof messages };
type TPages = { pages: typeof pages };
type TForms = { forms: typeof forms };
type TLayout = { layout: typeof layout };
type TComponents = { components: typeof components };
type TSheets = { sheets: typeof sheets };

type Messages = TMessages & TPages & TForms & TLayout & TComponents & TSheets;

declare global {
  interface IntlMessages extends Messages {}
}
