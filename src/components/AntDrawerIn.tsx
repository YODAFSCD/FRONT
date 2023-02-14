import React, { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import {
    createFetch,
    invoice,
    updateFetch,
} from '../services/Service';
import { InvoiceData } from '../pages/Invoice';
import {Button, Col, Drawer, Form, FormInstance, Input, Row} from 'antd';

type DrawerType = {
    open: boolean;
    setOpen: any;
    fields?: InvoiceData;
};

export const AntDrawerIn: React.FC<DrawerType> = ({open, setOpen, fields}: DrawerType) => {
    const [form] = Form.useForm();
    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };
    const onFinish = async (values: InvoiceData) => {
        values.id = Number(values.id);
        await trigger(values);
        onClose();
    };

    useEffect(() => {
        form.setFieldsValue(fields);
    }, [fields, form]);

    const { trigger, isMutating } = useSWRMutation(
        fields ? `${invoice}/${fields.id}` : invoice,
        fields ? updateFetch : createFetch
    );

    return (
        <Drawer
            title="Create a new"
            width={720}
            onClose={onClose}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <FormSection form={form} loading={isMutating} onFinish={onFinish} />
        </Drawer>
    );
};



type FormType = {
 form:FormInstance;
 loading: boolean;
 onFinish: any
}
const FormSection: React.FC<FormType> = ({ form, loading, onFinish }) => (
    <Form
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
        form={form}
    >
       <Row gutter={16}>
           
           <Col span={12}>
               <Form.Item
                   name="total"
                   label="Total"
                   rules={[{ required: true, message: 'Introduzca el total' }]}
               >
                   <Input placeholder="Introduzca el total" />
               </Form.Item>
           </Col>
           <Col span={12}>
               <Form.Item
                   name="client"
                   label="Cliente"
                   rules={[{ required: true, message: 'Introduzca al cliente' }]}
               >
                   <Input placeholder="Introduzca al client" />
               </Form.Item>
           </Col>
         
       </Row>
        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                Save
            </Button>
        </Form.Item>
    </Form>
)
