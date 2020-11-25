/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

export class StringUtils {
    public static getLastWord(from: string, cursorPosition: number): string {
        if (!from) {
            return null;
        }
        if (from.length > cursorPosition) {
            from =
                from.substr(0, cursorPosition) +
                from.substr(cursorPosition).split(/[\s,;.:]/)[0];
        }
        if (!from) {
            return null;
        }
        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
        if (from.match(/[\s,.!?;:]$/)) {
            return null;
        }
        const stringArray = from.split(/[\s,.!?;:]/);
        return stringArray[stringArray.length - 1];
    }

    public static insert(from: string, newValue: string, cursorStartPosition: number, cursorEndPosition: number): { value: string; newStartPosition: number; newEndPosition: number } {
        if (cursorStartPosition === cursorEndPosition) {
            const result = {
                value:
                    from.substring(
                        0,
                        cursorStartPosition === 0 ? 0 : cursorStartPosition + 1
                    ) + newValue,
                newStartPosition: 0,
                newEndPosition: 0
            };
            result.newStartPosition = result.value.length;
            result.newEndPosition = result.value.length;
            return result;
        } else {
            const result = {
                value: from.substring(0, cursorStartPosition),
                newStartPosition: 0,
                newEndPosition: 0
            };
            result.newStartPosition = result.value.length;
            result.value += newValue;
            result.newEndPosition = result.value.length;
            result.value = result.value + from.substring(cursorEndPosition);
            return result;
        }
    }

    public static replace(
        from: string,
        lastValue: string,
        newValue: string,
        cursorStartPosition: number,
        cursorEndPosition: number
    ): { newStartPosition: number; newEndPosition: number; value: string } {
        if (cursorStartPosition === cursorEndPosition) {
            let position = cursorStartPosition;
            // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
            if (from.charAt(position).match(/[\s,;.:]/)) {
                position--;
            }
            // eslint-disable-next-line no-loops/no-loops, @typescript-eslint/prefer-regexp-exec
            while (!from.charAt(position).match(/[\s,;.:]/) && position > 0) {
                position--;
            }
            const result = {
                value:
                    from.substring(0, position === 0 ? 0 : position + 1) +
                    newValue,
                newStartPosition: 0,
                newEndPosition: 0
            };
            result.newStartPosition = result.value.length;
            result.newEndPosition = result.value.length;
            result.value =
                result.value +
                from.substring(
                    (position === 0 ? 0 : position + 1) +
                    (lastValue ? lastValue.length : 0)
                );

            return result;
        } else {
            const result = {
                value: from.substring(0, cursorStartPosition),
                newStartPosition: 0,
                newEndPosition: 0
            };
            result.newStartPosition = result.value.length;
            result.value += newValue;
            result.newEndPosition = result.value.length;
            result.value = result.value + from.substring(cursorEndPosition);
            return result;
        }
    }

    public static removeLastWord(
        from: string,
        cursorStartPosition: number,
        cursorEndPosition: number
    ): { startValue: string; endValue: string } {
        if (cursorStartPosition === cursorEndPosition) {
            let position = cursorStartPosition;
            // eslint-disable-next-line no-loops/no-loops, @typescript-eslint/prefer-regexp-exec
            while (!from.charAt(position).match(/[\s,;.:]/) && position > 0) {
                position--;
            }
            let endPosition = cursorEndPosition + 1;
            // eslint-disable-next-line no-loops/no-loops, @typescript-eslint/prefer-regexp-exec
            while (!from.charAt(endPosition).match(/[\s,;.:]/) && endPosition < from.length) {
                endPosition++;
            }
            const result = {
                startValue: from.substring(
                    0,
                    position === 0 ? 0 : position + 1
                ),
                endValue: from.substring(endPosition)
            };
            return result;
        } else {
            const result = {
                startValue: from.substring(0, cursorStartPosition),
                endValue: from.substring(cursorEndPosition)
            };
            return result;
        }
    }
}
