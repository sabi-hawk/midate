import { Form } from "antd";
import { MaskedInput } from "antd-mask-input";
import { ComponentProps } from "react";

function NumInput({
  name,
  restField,
  validationErrors,
  disabled,
  required,
  form,
}: ComponentProps<any>) {
  const sms = Form.useWatch("sms", form);

  const applyPatternRule = sms?.mobile !== "+1 (___)-___-____";

  return (
    <Form.Item
      validateTrigger="onSubmit"
      name={[name, "mobile"]}
      validateStatus={validationErrors[`to[${name}]`] && "error"}
      help={validationErrors[`to[${name}]`]}
      {...restField}
      rules={[
        {
          required,
          message: "Phone number is required",
        },
        applyPatternRule && {
          pattern: applyPatternRule
            ? /^(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?)|[0-9]?)\s*[)]?[-\s.]?[(]?[0-9]{1,3}[)]?([-\s.]?[0-9]{3})([-\s.]?[0-9]{3,4})$/
            : undefined,
          message: "Phone number format is not valid",
        },
      ]}
    >
      <MaskedInput
        id="phone_num_input"
        disabled={disabled}
        mask="+{1} (000)-000-0000"
        placeholder="+1 (XXX)-XXX-XXXX"
        autoFocus
      />
    </Form.Item>
  );
}

export default NumInput;
