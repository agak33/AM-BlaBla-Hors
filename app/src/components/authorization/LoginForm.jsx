import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';

export function LoginForm({ fields, errors, emailLabel, passwordLabel }) {
  return (
    <>
      <FloatingLabel label={emailLabel}>
        <Form.Control
          type="email"
          id={`${fields.email}`}
          isInvalid={errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label={passwordLabel}>
        <Form.Control
          type="password"
          id={`${fields.password}`}
          isInvalid={errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </FloatingLabel>
    </>
  );
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  emailLabel: PropTypes.string.isRequired,
  passwordLabel: PropTypes.string.isRequired,
};
