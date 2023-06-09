import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/app/store';
import { signInUser } from './accountSlice';

export default function Login() {
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
      await dispatch(signInUser(data));
      push((query?.from as string) || '/catalog');
    } catch (error) {
      console.error(error);
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
        Sign in
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
          label="Username"
          autoFocus
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={errors?.username?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
        />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isSubmitting}
          disabled={!isValid}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item xs={12} textAlign="center">
            <Link href="/register">{"Don't have an account? Sign Up"}</Link>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Link href="/forgot">{'Forgot password?'}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
