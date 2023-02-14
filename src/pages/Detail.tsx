import {ColumnsType} from "antd/es/table";
import useSWR from "swr";
import {detail, fetch} from "../services/Service";
import { Space, Table, Button, Typography  } from 'antd';
import React, {useState} from "react";
import { PlusOutlined } from '@ant-design/icons';
import { AntDrawerDe } from "../components/AntDrawerDe";

export interface DetailData {
    id: number | string;
    invoiceId:number,
    invoice: string,
    quantity: number,
    clientId: number,
    productId: number,
    product:string
}

export const Detail: React.FC  = () => {
    const columns: ColumnsType<DetailData> = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
          },
        
        {
          title: 'Producto',
          dataIndex: 'product',
          key: 'product',
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantity',
            key: 'quantity',
          },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Typography.Link onClick={()=>fieldsEdit(record)} style={{ marginRight: 8 }}>
                        Editar
                    </Typography.Link>
                    <Typography.Link  style={{ marginRight: 8 }}>
                        Eliminar
                    </Typography.Link>

                </Space>
            ),
        },
    ];

    const [editingData, setEditingData] = useState<DetailData | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const fieldsEdit = (field: DetailData) => {
        setEditingData(field)
        setOpen(true);
    }
    const showDrawer = () => {
        setEditingData(undefined)
        setOpen(true);
    };

    const { data } = useSWR<DetailData[]>(detail, fetch, {
            suspense: false,
    });


        return(
            <>

                <AntDrawerDe open={open} setOpen={setOpen} fields={editingData}></AntDrawerDe>
                <Button type="primary" icon={<PlusOutlined />}  onClick={showDrawer} >
                    Agregar
                </Button>

                <h2>Detalle</h2>
                <Table columns={columns} dataSource={data} ></Table>
            </>

        );
    };
