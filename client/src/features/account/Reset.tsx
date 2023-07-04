import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/app/store';
import { resetPassword } from './accountSlice';
import { toast } from 'react-toastify';

export default function Reset() {
  const { push, query } = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid }
  } = useForm({
    mode: 'onTouched'
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(resetPassword({ ...data, ...query }));
      toast.success('Password reset successfully');
      push('/login');
    } catch (error: any) {
      const error1 = 'Invalid token.';
      const error2 =
        'Passwords must have at least one non alphanumeric character.';

      if (error.error && error.error.includes(error1)) {
        toast.error(error1);
        push('/forgot');
      } else if (error.error && error.error.includes(error2)) {
        toast.error(error2);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 3
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Reset Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(submitForm)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="New Password"
          type="password"
          {...register('newPassword', {
            required: 'Password is required',
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: 'Password does not meet complexity requirements'
            }
          })}
          error={!!errors.newPassword}
          helperText={errors?.newPassword?.message as string}
        />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isSubmitting}
          disabled={!isValid}
        >
          Reset Password
        </LoadingButton>
      </Box>
    </Container>
  );
}
