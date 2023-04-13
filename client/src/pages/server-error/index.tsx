import { Container, Divider, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function ServerError() {
  const { query } = useRouter();

  return (
    <Container component={Paper}>
      {query?.title ? (
        <>
          <Typography gutterBottom variant="h3" color="secondary">
            {query.title}
          </Typography>
          <Divider />
          <Typography variant="body1">
            {query.detail || 'Internal server error'}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
    </Container>
  );
}
