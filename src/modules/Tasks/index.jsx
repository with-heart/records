import Form from './form';
import Collection from 'src/components/collection';
import Preview from './preview';
const fields = [
  'id',
  'name',
  'due_date',
  'description',
  'priority',
  'team',
  'status',
  'project_id',
  'ref_project{name}',
];

const List = (props) => (
  <Collection
    resource={'tasks'}
    fields={fields}
    preview={Preview}
    {...props}
  />
);

export default { Form, List };
