import Form from './form';
import Collection from 'src/containers/collection';
import Preview from './preview';
const fields = [
  'id',
  'name',
  'description',
  "ref_projects{id,name,description, ref_tasks{status}}"
];
const List = (props) => (
  <Collection
    resource={'teams'}
    fields={fields}
    preview={Preview}
    {...props}
  />
);
const schema = {
  name: {
    type: 'string',
    label: 'Name',
  },
  description: {
    type: 'text',
    label: 'Description',
  },
};
export default { Form, List, schema };
