import { AuthPage } from '@refinedev/antd';

export const Login = () => {
  return (
    <AuthPage
      type='login'
      formProps={{
        initialValues: {
          email: 'michael.scott@dundermifflin.com',
          password: 'demodemo',
        },
      }}
    />
  );
};
