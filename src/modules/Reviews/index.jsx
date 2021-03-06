import Form from './form';
import Collection from 'src/containers/collection';
import Preview from './preview';
const fields = [
  'id',
  'timestamp',
  'type',
  'score',
  'summary',
];
const schema = {
  id: {
    type: 'uuid',
    label: 'ID',
  },
  timestamp: {
    type: 'timestamp',
    label: 'Timestamp',
  },
  type: {
    type: 'select',
    label: 'Type',
    options: [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
      { value: 'quarter', label: 'Quarter' },
    ],
  },
  scores: {
    type: 'json',
    label:'Scores'
  },
  checklist: {
    type: 'json',
    label:'Scores'
  },
  summary: {
    type: 'text',
    label:'Summary'
  },
};
const List = (props) => (
  <Collection
    resource={'reviews'}
    fields={fields}
    order_by={{ ref_team: { created_at: 'desc' } }}
    preview={Preview}
    {...props}
  />
);

export default { Form, List, schema };
