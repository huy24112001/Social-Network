import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import {Close, Send} from "@mui/icons-material";
import React from "react";

export default function DialogProfile(){

return (
<Dialog   onClose={()=> setShow(false)} open={show}>
    <DialogTitle >
        Register
        <IconButton
            sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            onClick={()=> setShow(false)}
        >
            <Close />
        </IconButton>
    </DialogTitle>

    <form onSubmit={handleSubmit2}>
        <DialogContent dividers>
            <DialogContentText>
                Please fill your information in the fields below:
            </DialogContentText>
            <TextField margin="normal" variant="standard" id="username" label="Username" type="text"
                       fullWidth
                       onChange={(e) => setUsername(e.target.value)} value={username}
                       inputProps={{ minLength: 2 }}
                       required
            />
            <TextField margin="normal" variant="standard" id="email" label="Email" type="email"
                       fullWidth
                       onChange={(e) => setEmail(e.target.value)} value={email}
                       required
            />
            <TextField margin="normal" variant="standard" id="password" label="Password"
                       type="password" fullWidth
                       onChange={(e) => setPassword(e.target.value)} value={password}
                       required/>
        </DialogContent>
        <DialogActions sx={{ px: '19px',marginTop:3 }}>
            <Button  type="submit" variant="contained" endIcon={<Send />}>
                Submit
            </Button>
        </DialogActions>
    </form>
    <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>

    </DialogActions>
</Dialog>
)
}
