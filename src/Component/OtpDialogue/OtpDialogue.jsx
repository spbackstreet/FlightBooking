import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useGlobalState from '../../hooks/useGlobalState';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import useLoader from '../../hooks/useLoader';
import { confirmAlert } from 'react-confirm-alert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function OtpDialogue() {
    const [otp, setOtp] = useState('');
    const history = useHistory();
    const [, dispatch] = useGlobalState();
    const [open, setOpen] = useState(true);
    const [triggerAction] = useLoader();

    const updateOtp = (event) => {
        setOtp(event.currentTarget.value.substring(0, 6))
    }

    const validateOtp = async () => {

        history.push('/localAddress');
        // const valOtpData = await triggerAction(() => validateOtp(otp));
        // if (storeAddData.storeList) {
        //     history.push('/localAddress');
        // }
        // else {
        //     confirmAlert({
        //         message: "Please Enter Valid OTP",
        //         buttons: [
        //             {
        //                 label: 'OK',
        //                 onClick: () => { return false }
        //             }
        //         ]
        //     });
        // }



    }

    // useEffect(() => {
    //     setPincode(defaultPincode);
    // }, [defaultPincode]);

    const handleClose = () => {
        setOpen(false);
        
    };

    return (

        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Enter Otp</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="otp"
                        label="OTP"
                        type="number"
                        fullWidth
                        value={otp}
                        // onChange = {(e) => callPincode(e.target.value)}
                        onChange={(e) => updateOtp(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={validateOtp} color="primary">
                        Validate
          </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}
