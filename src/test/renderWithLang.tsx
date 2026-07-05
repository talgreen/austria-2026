import type { ReactElement } from "react";
import { render, type RenderResult } from "@testing-library/react";
import { LangProvider } from "../lib/i18n";

/** Render a component tree wrapped in the app's language provider.
 *  Defaults to Hebrew (the app default) unless a test sets
 *  localStorage["austria:lang"] = "en" before calling. */
export function renderWithLang(ui: ReactElement): RenderResult {
  return render(<LangProvider>{ui}</LangProvider>);
}
