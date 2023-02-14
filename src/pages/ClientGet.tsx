import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Table } from 'antd';

export interface ClientL {
    content:Content[]
   
}
type Content = {
    id: number,
    nui:string,
    fullname: string,
    address: string
}

export default function Client(){
    const [data, setData] = useState<ClientL>()
    
    useEffect(() => {
        fetchData()
    
    }, [])

    const fetchData = async()=>{
        try{
            await axios.get('http://localhost:8082/client').then((res)=>setData(res.data))
        }catch(error){
            console.log(error)
        }
    }
 
    const columns = [
        {
          title: 'Código',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Cedula',
          dataIndex: 'nui',
          key: 'nui',
        },
        {
          title: 'Nombre',
          dataIndex: 'fullname',
          key: 'fullname',
        },
      ];
    
    return (
        
      
                    <div>
                      <h2>Clientes</h2>
                    <Table columns={columns} dataSource={data?.content} ></Table>
                    </div>
    );
};
