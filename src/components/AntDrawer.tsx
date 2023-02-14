import React, { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import {
    createFetch,
    product,
    updateFetch,
} from '../services/Service';
import { ProductData } from '../pages/Product';
import {Button, Col, Drawer, Form, FormInstance, Input, Row} from 'antd';

type DrawerType = {
    open: boolean;
    setOpen: any;
    fields?: ProductData;
};

export const AntDrawer: React.FC<DrawerType> = ({open, setOpen, fields}: DrawerType) => {
    const [form] = Form.useForm();
    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };
    const onFinish = async (values: ProductData) => {
        values.stock = Number(values.stock);
        await trigger(values);
        onClose();
    };

    useEffect(() => {
        form.setFieldsValue(fields);
    }, [fields, form]);

    const { trigger, isMutating } = useSWRMutation(
        fields ? `${product}/${fields.id}` : product,
        fields ? updateFetch : createFetch
    );

    return (
        <Drawer
            title="Producto"
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
                    name="description"
                    label="description"
                    rules={[{ required: true, message: 'description' }]}
                >
                    <Input placeholder="description" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="stock"
                    label="stock"
                    rules={[{ required: true, message: 'Please enter a episode' }]}
                >
                    <Input placeholder="Please enter a episode" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="price"
                    label="price"
                    rules={[{ required: true, message: 'Please enter a episode' }]}
                >
                    <Input placeholder="Please enter a episode" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="categoryID"
                    label="categoryID"
                    rules={[{ required: true, message: 'Please enter a episode' }]}
                >
                    <Input placeholder="Please enter a episode" />
                </Form.Item>
            </Col>            
            <Col span={12}>
                <Form.Item
                    name="category"
                    label="category"
                    rules={[{ required: true, message: 'Please enter a episode' }]}
                >
                    <Input placeholder="Please enter a episode" />
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
