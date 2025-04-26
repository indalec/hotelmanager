import { 
    TextField,
    Button,
    CircularProgress,
    Alert,
    Grid,
    Card,
    CardContent,
    Stack,
    Typography
  } from '@mui/material';
  import {
    MeetingRoom,
    Category,
    LocalBar,
    CheckCircle,
    HighlightOff,
    Search
  } from '@mui/icons-material';
  
  const CheckRoomForm = ({
    roomNumber,
    setRoomNumber,
    handleCheckRoom,
    loading,
    error,
    roomDetails
  }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!loading && roomNumber) {
        handleCheckRoom();
      }
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Enter Room Number"
              variant="outlined"
              type="number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value.replace(/\D/, ''))}
              InputProps={{
                inputProps: { 
                  min: 1,
                  style: { textAlign: 'center', fontSize: '1.2rem' }
                }
              }}
              autoFocus
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !roomNumber}
              size="large"
              sx={{ 
                height: '56px',
                px: 4,
                borderRadius: 1,
                fontSize: '1rem',
                minWidth: '132px'
              }}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <>
                  <Search sx={{ mr: 1 }}/>
                  Check
                </>
              )}
            </Button>
          </Stack>
        </form>
  
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
  
        {roomDetails && (
          <Card elevation={0} sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            mb: 4
          }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <MeetingRoom fontSize="large" color="primary"/>
                    <div>
                      <Typography variant="subtitle1" color="text.secondary">
                        Room Number
                      </Typography>
                      <Typography variant="h5" fontWeight={600}>
                        #{roomDetails.roomNumber}
                      </Typography>
                    </div>
                  </Stack>
                </Grid>
  
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Category fontSize="large" color="primary"/>
                    <div>
                      <Typography variant="subtitle1" color="text.secondary">
                        Room Type
                      </Typography>
                      <Typography variant="h6" fontWeight={500}>
                        {roomDetails.roomType.charAt(0) + 
                        roomDetails.roomType.slice(1).toLowerCase()}
                      </Typography>
                    </div>
                  </Stack>
                </Grid>
  
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <LocalBar fontSize="large" 
                      color={roomDetails.hasMinibar ? "success" : "error"}/>
                    <div>
                      <Typography variant="subtitle1" color="text.secondary">
                        Minibar
                      </Typography>
                      <Typography variant="h6" fontWeight={500}>
                        {roomDetails.hasMinibar ? 'Available' : 'Not available'}
                      </Typography>
                    </div>
                  </Stack>
                </Grid>
  
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {roomDetails.isAvailable ? (
                      <CheckCircle fontSize="large" color="success"/>
                    ) : (
                      <HighlightOff fontSize="large" color="error"/>
                    )}
                    <div>
                      <Typography variant="subtitle1" color="text.secondary">
                        Status
                      </Typography>
                      <Typography variant="h6" fontWeight={600}
                        sx={{ 
                          color: roomDetails.isAvailable ? 'success.main' : 'error.main'
                        }}>
                        {roomDetails.isAvailable 
                          ? "Available now" 
                          : "Currently occupied"}
                      </Typography>
                    </div>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </>
    );
  };
  
  export default CheckRoomForm;