import Toast from "../components/custom/CustomToast"
import api from '../axios/axios'

export const userPost = async (payload, setReRender) => {
    if (payload.name.length == 0) {
        Toast.error('Name cannot be empty!')
        return
    }
    if (payload.note.length > 200) {
        Toast.error('Note length should be 200 characters or less!')
        return;
    }
    await api.post('/user', payload)
        .then(response => {
            Toast.success(response.data?.message)
            setReRender(new Date().getTime())
        }).catch(err => {
            Toast.error(err?.response?.data?.message)
        })
}

export const getAllUsers = async (setData, setLoading, showLoader = true) => {
    if (showLoader)
        setLoading(true)
    try {
        const response = await api.get('/user');
        setData(response.data?.users);
    } catch (err) {
        Toast.error(err?.response?.data?.message);
    } finally {
        if (showLoader) {
            setLoading(false);
        }
    }
}