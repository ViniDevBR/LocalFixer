//HOOK FORM
import { Control, Controller, FieldError } from 'react-hook-form'
//INTERFACE && COMPONENTS
import { IFormData } from '@/screens/Login'
import { Input, InputProps } from '../Input'
//STYLES
import { Error } from './styles'


export interface Props extends InputProps {
  control: Control<IFormData>
  name: 'password' | 'email'
  error?: FieldError
}

export function ControlledInput({ ...props }: Props) {
  return (
    <>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field: { onChange, value }}) => (
          <Input onChangeText={onChange} value={value} {...props} />
        )}
      />

      {props.error && <Error>{props.error?.message}</Error>}
    </>
  )
}