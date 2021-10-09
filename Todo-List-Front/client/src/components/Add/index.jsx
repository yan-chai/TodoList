import { Form, Input, Button} from 'antd';
import axios from 'axios'


axios.interceptors.request.use(
	request => {
		if (request.url.include('done') || request.url.include('list')) {
			request.headers['user_id'] = store.getState().persistedUserReducer.userInfo.username;
		}
		return request
	},
	error => {
		return "Error Occur"
	}
)
const Add = () => {
  const onFinish = (values) => {
    //console.log('Success:', values);
	axios.post('http://localhost:3000/api/lists', {
		title: values.listName,
		description: values.description
	}).then(function (response) {
		if (response.status === 200) {
			alert("Add Success");
		}
	  })
	  .catch(function (error) {
		console.log(error);
	  });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
	  <div>
		  <h1>This is Lists Page</h1>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
			<Form
			name="basic"
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 8,
			}}
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			>
			<Form.Item
				label="List Name"
				name="listName"
				rules={[
				{
					required: true,
					message: 'Please input a Name!',
				},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Description"
				name="description"
				rules={[
				{
					required: true,
					message: 'Please input a description!',
				},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				wrapperCol={{
				offset: 8,
				span: 16,
				}}
			>
				<Button type="primary" htmlType="submit">
				Submit
				</Button>
			</Form.Item>
			</Form>
		</div>
	</div>
  );
};

export default Add;