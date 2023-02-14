import React, { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import {
    createFetch,
    detail,
    updateFetch,
} from '../services/Service';
import {Button, Col, Drawer, Form, FormInstance, Input, Row} from 'antd';
import { DetailData } from '../pages/Detail';

type DrawerType = {
    open: boolean;
    setOpen: any;
    fields?: DetailData;
};

export const AntDrawerDe: React.FC<DrawerType> = ({open, setOpen, fields}: DrawerType) => {
    const [form] = Form.useForm();
    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };
    const onFinish = async (values: DetailData) => {
        values.quantity = Number(values.quantity);
        await trigger(values);
        onClose();
    };

    useEffect(() => {
        form.setFieldsValue(fields);
    }, [fields, form]);

    const { trigger, isMutating } = useSWRMutation(
        fields ? `${detail}/${fields.id}` : detail,
        fields ? updateFetch : createFetch
    );

    return (
        <Drawer
            title="Detalle"
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
                    name="Cantidad"
                    label="quantity"
                    rules={[{ required: true, message: 'cantidad' }]}
                >
                    <Input placeholder="description" />
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
