import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { useFontSize } from "../../Providers"
import { Label, LabelProps } from "../Label"

const Input = styled.input<Pick<TextInputProps, "invalid">>(
  ({ theme: { color, space }, invalid }) => {
    const fontSize = useFontSize()
    return css`
      font-size: ${fontSize}rem;
      height: calc(${space.medium} * 2);
      width: 100%;

      color: ${color.fg.surface};
      background-color: transparent;

      border: none;
      outline: none;
      border-bottom: ${space.smallest} solid ${color.fg.base};

      :focus-visible {
        border-color: ${color.primary.base};
      }

      ${invalid &&
      css`
        &,
        :focus-visible {
          border-color: ${color.palette.red};
        }
      `}
    `
  }
)

export type TextInputProps = LabelProps & {
  placeholder?: string
  value?: string
  className?: string
  autoFocus?: boolean
  invalid?: boolean
  onChange?: (value: string) => void
  onKeyDown?: (key: string) => void
}

export const TextInput = ({
  onChange,
  onKeyDown,
  label,
  invalid,
  ...delegated
}: TextInputProps) => {
  const TextInput = (
    <Input
      type="text"
      invalid={invalid}
      onClick={click => click.stopPropagation()}
      onChange={event => onChange?.(event.currentTarget.value)}
      onKeyDown={event => onKeyDown?.(event.key)}
      {...delegated}
    />
  )

  if (label)
    return (
      <Label label={label} invalid={invalid}>
        {TextInput}
      </Label>
    )
  else return TextInput
}
