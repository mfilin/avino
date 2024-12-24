import React from 'react';
import styles from './ManagerCallForm.module.scss';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import { useMutation } from '@tanstack/react-query';
import Api from '../../api/index';
import SelectCustom from '../../elements/SelectCustom';
import { HOURS } from '../../mockdata/hours';
import Button from '../Button';
import Text from '../Typography/Text';
import { selectStyles } from './selectStyles';

interface IManagerCallForm {
  name: string;
  phone: string;
  startTime: string;
  endTime: string;
}
const ManagerCallForm: React.FC = () => {
  const { control, handleSubmit, setValue } = useForm<IManagerCallForm>({
    mode: 'onChange',
  });

  const { mutate } = useMutation({
    mutationFn: async (values: IManagerCallForm) => {
      console.log('values', values);
      // await Api.instance.cart.sendCartFull({
      //   name: values.name,
      //   phone: values.phone,
      // });
    },
  });

  const handleSubmitForm = React.useCallback(
    (data: IManagerCallForm) => {
      mutate(data);
    },
    [mutate],
  );

  const handleChangeStartTime = React.useCallback((option) => {
    setValue('startTime', option?.value);
  }, []);

  const handleChangeEndTime = React.useCallback((option) => {
    setValue('endTime', option?.value);
  }, []);

  const hoursForSelect = React.useMemo(() => {
    return HOURS.slice(9, 19).map((hour) => ({ label: hour, value: hour }));
  }, []);

  return (
    <div className={styles.ManagerCallForm}>
      <div className={styles.Text}>
        <Text level="s13h18w500">
          Наш менеджер перезвонит Вам в рабочее время:
        </Text>
        <Text level="s13h18w700">Пн-пт с 9:00 до 21:00. Сб-Вс выходные</Text>
      </div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Input
          control={control}
          name="name"
          rules={{ required: true }}
          placeholder="Имя"
        />
        <Input
          control={control}
          name="phone"
          rules={{ required: true }}
          placeholder="Телефон"
        />
        <div className={styles.TimeBlock}>
          <Text level="s15h20w400">Удобное время с</Text>
          <SelectCustom
            name="startTime"
            options={hoursForSelect}
            onChange={handleChangeStartTime}
            defaultValue={hoursForSelect[0]}
            styles={selectStyles}
          />
          <Text level="s15h20w400">до</Text>
          <SelectCustom
            name="endTime"
            options={hoursForSelect}
            onChange={handleChangeEndTime}
            defaultValue={hoursForSelect.at(-1)}
            styles={selectStyles}
          />
        </div>
        <Button color="orange-fill" type="submit" stretched>
          Отправить заявку
        </Button>
      </form>
    </div>
  );
};
export default ManagerCallForm;
