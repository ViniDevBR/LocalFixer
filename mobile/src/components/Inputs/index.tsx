import { ControlledInput, Props } from './ControlInput'
import { Input as BasicInput, InputProps as BasicInputProps } from './Input'

type allInterfaces = Props & BasicInputProps

// type ITypeInput = ({
//     type: 'textarea',
//     props: BasicInputProps
//   } | {
//     type: 'control',
//     props: Props
//   })

interface ITypeInput extends allInterfaces {
  type: 'textarea' | 'control'
}

export function Input({ type, ...props }: ITypeInput) {
  const data = {
    textarea: <BasicInput {...props}/>,
    control: <ControlledInput {...props}/>
  }

  return data[type]
}