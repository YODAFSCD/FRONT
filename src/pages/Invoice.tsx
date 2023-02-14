import {ColumnsType} from "antd/es/table";
import useSWR from "swr";
import {fetch, invoice} from "../services/Service";
import { Space, Table, Button, Typography  } from 'antd';
import React, {useState} from "react";
import { PlusOutlined } from '@ant-design/icons';
import { AntDrawerIn } from "../components/AntDrawerIn";
import { NavLink } from "react-router-dom";

export interface InvoiceData {
    id: number;
        code:string,
        createAt: number,
        total: number,
        clientId: number,
        client:string
}

export const Invoice: React.FC  = () => {
    const columns: ColumnsType<InvoiceData> = [
        {
            title: 'Código',
            dataIndex:'id',
            key: 'id',
        },
        {
            title: 'Fecha',
            dataIndex: 'createAt',
            key: 'createAt',
          },
          {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
          },
          {
              title: 'Cliente',
              dataIndex: 'client',
              key: 'client',
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
                    <Typography.Link  style={{ marginRight: 8 }}>
                    <NavLink to="/detalle">Detalle</NavLink>
                    </Typography.Link>

                </Space>
            ),
        },
    ];

    const [editingData, setEditingData] = useState<InvoiceData | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const fieldsEdit = (field: InvoiceData) => {
        setEditingData(field)
        setOpen(true);
    }
    const showDrawer = () => {
        setEditingData(undefined)
        setOpen(true);
    };

    const { data} = useSWR<InvoiceData[]>(invoice, fetch, {
            suspense: false,
    });


        return(
            <>
                <AntDrawerIn open={open} setOpen={setOpen} fields={editingData}></AntDrawerIn>
                <Button type="primary" icon={<PlusOutlined />}  onClick={showDrawer} >
                    Agregar
                </Button>
                <h2>Facturas</h2>
                <Table columns={columns} dataSource={data} ></Table>
            </>

        );
    };
