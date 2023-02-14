import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Table } from 'antd';

export interface CategoryL {
    content:Content[]
   
}
type Content = {
    id: number,
    description: string
}

export default function Category(){
    const [data, setData] = useState<CategoryL>()
    
    useEffect(() => {
        fetchData()
    
    }, [])

    const fetchData = async()=>{
        try{
            await axios.get('http://localhost:8082/category').then((res)=>setData(res.data))
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
          title: 'Categoría',
          dataIndex: 'description',
          key: 'description',
        },
       
      ];
    
    return (
        
                    <div>
                    <Table columns={columns} dataSource={data?.content} ></Table>
                    </div>
    );
};
