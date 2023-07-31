import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { profileEndEditAction, profileEditAction } from "../../features/profile"
import styled from "styled-components"


const EditProfileForm = ({api, user}) => {

    const { register, handleSubmit, formState: {errors}, reset} = useForm()
    const dispatch = useDispatch()
    //const user = useSelector((state) => (state.profile.user))
    const rememberUser = useSelector(state => state.connexion.rememberUser)

    const onSubmit = async (data) => {
        //const result = await api.patchUserProfile(data.firstName, data.lastName, header)

        const header = rememberUser ? 
                {'Authorization': `Bearer ${localStorage.getItem("token")}`}:
                {'Authorization': `Bearer ${sessionStorage.getItem("token")}`}

        if(data.firstName === ''){
            if(data.lastName !== ''){
                const result = await api.patchUserProfile(user.firstName, data.lastName, header)
                if(result.status === 200){
                    dispatch(profileEditAction({lastName: data.lastName}))
                }
            }
        }else{
            if(data.lastName === ''){
                const result = await api.patchUserProfile(data.firstName, user.lastName, header)
                if(result.status === 200){
                    dispatch(profileEditAction({firstName: data.firstName}))
                }
            }else{
                const result = await api.patchUserProfile(data.firstName, data.lastName, header)
                if(result.status === 200){
                    dispatch(profileEditAction({firstName: data.firstName, lastName: data.lastName}))
                }
            }
        }
                
        reset({
            firstName: "",
            lastName: ""
        })
    }

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs-wrapper">
                <div className="input-wrapper">
                    {/*<label htmlFor="firstName" hidden>Firstname</label>*/}
                    <input 
                    type="text" 
                    id="firstName" 
                    placeholder={user.firstName} 
                    {...register("firstName",
                    {pattern: {
                        value: /^[a-zA-Z]*$/,
                        message: "Only alphabetic character allowed"
                    }})}/>
                </div>
                <div className="input-wrapper">
                    {/*<label htmlFor="lastName">Lastname</label>*/}
                    <input 
                    type="text" 
                    id="lastName" 
                    placeholder={user.lastName} 
                    {...register("lastName",
                    {pattern: {
                        value: /^[a-zA-Z]*$/,
                        message: "Only alphabetic character allowed"
                    }})}/>
                    {errors?.lastName && <p className="error-msg">{errors.lastName.message}</p>}
                </div>
            </div>
            <div className="button-wrapper">
                <button className="save-edit-button" type="submit">Save</button>
                <button className="cancel-edit-button" type="button" onClick={() => dispatch(profileEndEditAction())}>Cancel</button>
            </div>
        </StyledForm>
    )
}


const StyledForm = styled.form`

    .inputs-wrapper{
        display:flex;
        justify-content:center;
        margin-bottom:15px;
    }

    .input-wrapper{
        margin-right: 15px;
    }

    .save-edit-button, .cancel-edit-button{
        height:35px;
        width:120px;
        margin-right:15px;
        border:2px solid #7C71F7;
        border-radius:5px;
        color:#7C71F7;
    }

    input{
        height:40px;
        border-radius:5px;
        border: 2px solid #B8C4CE;
    }

    .error-msg {
        margin-top:5px;
        color:red;
        font-size:0.8rem;
        font-weight:bold;
    }
`

export default EditProfileForm