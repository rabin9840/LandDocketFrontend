import {create as ipfsHttpClient} from 'ipfs-http-client';
const client= ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const ipfs = ipfsHttpClient('http://localhost:5001')

// import ipfs from '../ipfs'

const ImageInstalling= ()=>{
    return(
        <>
        <h1>to install the image into the ipfs</h1>
                <div>
            <label>
                <p>Upload Image</p>
                <input type="file" placeholder="Upload image" onChange={async(e)=>{
                    const file= e.target.files[0];
                    console.log(file);

                    //console.log(client);
                    const add=await ipfs.add(file,(error,result)=>{
                        if(error){
                            alert(error);
                            return
                        }
                        console.log(result[0].hash);
                    });
                    const imageUrl= `https://ipfs.infura.io/ipfs/${add.path}`;
                    // console.log(imageUrl);

                }} />
            </label>
        </div>

</>
    )
}

export default ImageInstalling;