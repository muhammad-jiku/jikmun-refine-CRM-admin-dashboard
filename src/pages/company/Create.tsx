import SelectAvatar from '@/components/shared/SelectAvatar';
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import { UsersSelectQuery } from '@/graphql/types';
import { useModalForm, useSelect } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { Form, Input, Modal, Select } from 'antd';
import { CompanyList } from './List';

const Create = () => {
  const go = useGo();

  const goToListPage = () => {
    go({
      to: { resource: 'companies', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: 'create',
    defaultVisible: true,
    resource: 'companies',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });

  const { selectProps, queryResult } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: 'users',
    optionLabel: 'name',
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <CompanyList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToListPage}
        title='Create Company'
        width={512}
      >
        <Form {...formProps} layout='vertical'>
          <Form.Item
            label='Company name'
            name='name'
            rules={[{ required: true }]}
          >
            <Input placeholder='Please enter a company name' />
          </Form.Item>
          <Form.Item
            label='Sales owner'
            name='salesOwnerId'
            rules={[{ required: true }]}
          >
            <Select
              placeholder='Please select a sales owner'
              {...selectProps}
              options={
                queryResult.data?.data.map((user) => ({
                  value: user.id,
                  label: (
                    <SelectAvatar
                      name={user.name}
                      avatarUrl={user.avatarUrl ?? undefined}
                    />
                  ),
                })) ?? []
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </CompanyList>
  );
};

export default Create;
