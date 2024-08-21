import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          marginTop: '25%',
        }}
      >
        <CircularProgress sx={{ color: '#000' }} />
      </div>
    </div>
  );
};

export default Loading;
