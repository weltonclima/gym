import { Input } from "@components/Input";
import { FormControl, IInputProps } from "native-base";
import { Control, Controller, FieldPath, FieldPathValue, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> extends IInputProps {
  name: FieldPath<T>;
  control: Control<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
}
export function FormInput<T extends FieldValues>({
  name, control, defaultValue, ...rest
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? "" as any}
      render={({
        field: { onChange, value, ref },
        fieldState: { error }
      }) => (
        <FormControl isInvalid={!!error} mt={4}>
          <Input
            onChangeText={onChange}
            value={value}
            isInvalid={!!error}
            _invalid={{
              borderWidth: 1,
              borderColor: "red.500"
            }}
            {...rest}
          />
          <FormControl.ErrorMessage mt={-0.5}>
            {error?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  )
}