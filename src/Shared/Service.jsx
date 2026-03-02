
/*import axios from "axios";

const SendBirdApplicationId=import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken=import.meta.env.VITE_SENDBIRD_API_TOKEN;*/
const FormatResult = (resp) => {
    const grouped = {};

    resp.forEach((item) => {
        const listing = item.carListing;
        const image = item.carImages;

        if (!listing?.id) return;

        if (!grouped[listing.id]) {
            grouped[listing.id] = {
                ...listing,
                images: []
            };
        }

        if (image) {
            grouped[listing.id].images.push(image);
        }
    });

    return Object.values(grouped);
};

/*const CreateSendBirdUser=(userId,nickName,profileUrl)=>{
    
    return axios.post('https://api-'+SendBirdApplicationId+'.sendbird.com/v3/users',{
        user_id:userId,
        nickname:nickName,
        profile_url:profileUrl,
        issue_access_token:false
    },{
        headers:{
            'Content-Type':'application/json',
            'Api-Token':SendBirdApiToken
        }
    });
}


const CreateSendBirdChannel=(users,title)=>{
    return axios.post('https://api-'+SendBirdApplicationId+'.sendbird.com/v3/group_channels',{
        user_ids:users,
        is_distinct:true,
        name:title,
        operator_ids:[users[0]]

    },{
        headers:{
            'Content-Type':'application/json',
            'Api-Token':SendBirdApiToken
        }
    })
}*/

export default{
    FormatResult,
   /* CreateSendBirdUser,
    CreateSendBirdChannel*/
}