/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Color from 'color';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {useColorMode} from '@docusaurus/theme-common';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import {
  type ColorState,
  COLOR_SHADES,
  LIGHT_PRIMARY_COLOR,
  DARK_PRIMARY_COLOR,
  LIGHT_BACKGROUND_COLOR,
  DARK_BACKGROUND_COLOR,
  getAdjustedColors,
  lightStorage,
  darkStorage,
  updateDOMColors,
} from '@site/src/utils/colorUtils';
import styles from './styles.module.css';

function wcagContrast(foreground: string, background: string) {
  const contrast = Color(foreground).contrast(Color(background));
  // eslint-disable-next-line no-nested-ternary
  return contrast > 7 ? 'AAA 🏅' : contrast > 4.5 ? 'AA 👍' : 'Fail 🔴';
}

export default function ColorGenerator(): JSX.Element {
  const {colorMode, setColorMode} = useColorMode();

  const isDarkTheme = colorMode === 'dark';

  const DEFAULT_PRIMARY_COLOR = isDarkTheme
    ? DARK_PRIMARY_COLOR
    : LIGHT_PRIMARY_COLOR;
  const DEFAULT_BACKGROUND_COLOR = isDarkTheme
    ? DARK_BACKGROUND_COLOR
    : LIGHT_BACKGROUND_COLOR;

  const [inputColor, setInputColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [baseColor, setBaseColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [background, setBackground] = useState(DEFAULT_BACKGROUND_COLOR);
  const [shades, setShades] = useState(COLOR_SHADES);
  const [storage, setStorage] = useState(
    isDarkTheme ? darkStorage : lightStorage,
  );

  useEffect(() => {
    setStorage(isDarkTheme ? darkStorage : lightStorage);
  }, [isDarkTheme]);

  // Switch modes -> update state by stored values
  useEffect(() => {
    const storedValues = JSON.parse(
      storage.get() ?? '{}',
    ) as Partial<ColorState>;
    setInputColor(storedValues.baseColor ?? DEFAULT_PRIMARY_COLOR);
    setBaseColor(storedValues.baseColor ?? DEFAULT_PRIMARY_COLOR);
    setBackground(storedValues.background ?? DEFAULT_BACKGROUND_COLOR);
    setShades(storedValues.shades ?? COLOR_SHADES);
  }, [storage, DEFAULT_BACKGROUND_COLOR, DEFAULT_PRIMARY_COLOR]);

  // State changes -> update DOM styles
  useEffect(() => {
    updateDOMColors({baseColor, background, shades}, isDarkTheme);
    storage.set(JSON.stringify({baseColor, background, shades}));
  }, [baseColor, background, shades, storage, isDarkTheme]);

  function updateColor(event: React.ChangeEvent<HTMLInputElement>) {
    // Only prepend # when there isn't one.
    // e.g. ccc -> #ccc, #ccc -> #ccc, ##ccc -> ##ccc,
    const colorValue = event.target.value.replace(/^(?=[^#])/, '#');
    setInputColor(colorValue);

    try {
      setBaseColor(Color(colorValue).hex());
    } catch {
      // Don't update for invalid colors.
    }
  }

  return (
    <div>
      <Admonition type="tip">
        <p>
          <Translate
            id="colorGenerator.tip.body"
            values={{
              wcagLink: (
                <Link href="https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast">
                  <Translate id="colorGenerator.tip.body.wcagLink.label">
                    WCAG-AA contrast ratio
                  </Translate>
                </Link>
              ),
            }}>
            {
              "目标至少达到 {wcagLink} 的主色，以确保可读性。使用 Docusaurus 网站本身来预览你的配色方案效果。由于一种颜色通常无法同时适用于明亮和暗黑模式，因此可以在暗黑模式下使用替代配色方案。"
            }
          </Translate>
        </p>
      </Admonition>
      <p>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="primary_color">
          <strong className="margin-right--sm">
            <Translate id="colorGenerator.inputs.primary.label">
            主色：
            </Translate>
          </strong>
        </label>{' '}
        <input
          id="primary_color"
          type="text"
          className={clsx(styles.input, 'margin-right--sm')}
          value={inputColor}
          onChange={updateColor}
        />
        <input
          type="color"
          className={styles.colorInput}
          // value has to always be a valid color, so baseColor instead of
          // inputColor
          value={baseColor}
          onChange={updateColor}
        />
        <button
          type="button"
          className="clean-btn button button--primary margin-left--md"
          onClick={() => setColorMode(isDarkTheme ? 'light' : 'dark')}>
          <Translate
            id="colorGenerator.inputs.modeToggle.label"
            values={{
              colorMode: isDarkTheme ? (
                <Translate id="colorGenerator.inputs.modeToggle.label.colorMode.light">
                  亮色
                </Translate>
              ) : (
                <Translate id="colorGenerator.inputs.modeToggle.label.colorMode.dark">
                  暗色
                </Translate>
              ),
            }}>
            {'编辑{colorMode}模式'}
          </Translate>
        </button>
        <button
          type="button"
          className="clean-btn button button--secondary margin-left--md"
          onClick={() => {
            setInputColor(DEFAULT_PRIMARY_COLOR);
            setBaseColor(DEFAULT_PRIMARY_COLOR);
            setBackground(DEFAULT_BACKGROUND_COLOR);
            setShades(COLOR_SHADES);
          }}>
          <Translate id="colorGenerator.inputs.resetButton.label">
            重置
          </Translate>
        </button>
      </p>
      <p>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="background_color">
          <strong className="margin-right--sm">
            <Translate id="colorGenerator.inputs.background.label">
            背景色：
            </Translate>
          </strong>
        </label>
        <input
          id="background_color"
          type="color"
          className={clsx(styles.colorInput, 'margin-right--sm')}
          value={background}
          onChange={(e) => {
            setBackground(e.target.value);
          }}
        />
      </p>
      <div>
        <table className={styles.colorTable}>
          <thead>
            <tr>
              <th>
                <Translate id="colorGenerator.table.heading1">
                CSS 变量名称
                </Translate>
              </th>
              <th>
                <Translate
                  id="colorGenerator.table.heading2"
                  description="This column is the color's representation in hex">
                  16 进制颜色
                </Translate>
              </th>
              <th>
                <Translate
                  id="colorGenerator.table.heading3"
                  description="This column is the adjusted shades' adjustment values relative to the primary color">
                  调整
                </Translate>
              </th>
              <th>
                <Translate
                  id="colorGenerator.table.heading4"
                  description="This column is WCAG contrast rating: AAA, AA, Fail">
                  对比度（前景和背景）
                </Translate>
              </th>
            </tr>
          </thead>
          <tbody>
            {getAdjustedColors(shades, baseColor)
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((value) => {
                const {variableName, adjustment, adjustmentInput, hex} = value;
                return (
                  <tr key={variableName}>
                    <td>
                      <code>{variableName}</code>
                    </td>
                    <td>
                      <span
                        className={styles.color}
                        style={{
                          backgroundColor: hex,
                        }}
                      />
                      <code className="margin-left--sm">
                        {hex.toLowerCase()}
                      </code>
                    </td>
                    <td>
                      {variableName === '--ifm-color-primary' ? (
                        0
                      ) : (
                        <input
                          aria-label={`${variableName} CSS variable name`}
                          className={styles.input}
                          type="number"
                          value={adjustmentInput}
                          onChange={(event) => {
                            const newValue = parseFloat(event.target.value);
                            setShades({
                              ...shades,
                              [variableName]: {
                                ...shades[variableName]!,
                                adjustmentInput: event.target.value,
                                adjustment: Number.isNaN(newValue)
                                  ? adjustment
                                  : newValue / 100.0,
                              },
                            });
                          }}
                        />
                      )}
                    </td>
                    <td
                      style={{
                        fontSize: 'medium',
                        backgroundColor: background,
                        color: hex,
                      }}>
                      <b>{wcagContrast(hex, background)}</b>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <p>
        <Translate
          id="colorGenerator.text"
          // eslint-disable-next-line @docusaurus/no-untranslated-text
          values={{cssPath: <code>src/css/custom.css</code>}}>
          {"用这些新变量替换 {cssPath} 中的变量。"}
        </Translate>
      </p>
      <CodeBlock className="language-css" title="/src/css/custom.css">
        {`${isDarkTheme ? "[data-theme='dark']" : ':root'} {
${getAdjustedColors(shades, baseColor)
  .sort((a, b) => a.codeOrder - b.codeOrder)
  .map((value) => `  ${value.variableName}: ${value.hex.toLowerCase()};`)
  .join('\n')}${
          background !== DEFAULT_BACKGROUND_COLOR
            ? `\n  --ifm-background-color: ${background};`
            : ''
        }
}`}
      </CodeBlock>
    </div>
  );
}