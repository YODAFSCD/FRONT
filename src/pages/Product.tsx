import {ColumnsType} from "antd/es/table";
import useSWR from "swr";
import {fetch, product} from "../services/Service";
import { Space, Table, Button, Typography  } from 'antd';
import React, {useState} from "react";
import { PlusOutlined } from '@ant-design/icons';
import {AntDrawer} from "../components/AntDrawer";

export interface ProductData {
    id: number | string;
    description:string,
    stock: number,
    price: number,
    categoryId: number,
    category:number
}

export const Product: React.FC  = () => {
    const columns: ColumnsType<ProductData> = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
          },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Stock',
          dataIndex: 'stock',
          key: 'stock',
        },
        {
          title: 'Precio',
          dataIndex: 'price',
          key: 'price',
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            key: 'category',
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

    const [editingData, setEditingData] = useState<ProductData | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const fieldsEdit = (field: ProductData) => {
        setEditingData(field)
        setOpen(true);
    }
    const showDrawer = () => {
        setEditingData(undefined)
        setOpen(true);
    };

    const { data } = useSWR<ProductData[]>(product, fetch, {
            suspense: false,
    });


        return(
            <>
                <AntDrawer open={open} setOpen={setOpen} fields={editingData}></AntDrawer>
                <Button type="primary" icon={<PlusOutlined />}  onClick={showDrawer} >
                    Agregar
                </Button>
                <h2>Productos</h2>
                <Table columns={columns} dataSource={data} ></Table>
            </>

        );
    };
