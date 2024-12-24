import React from 'react';
import styles from './SubscribeToPromoForm.module.scss';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Input from '../Input';
import Text from '../Typography/Text';
import Button from '../Button';
interface IPromoSubscribingForm {
  email: string;
}
const SubscribeToPromoForm: React.FC = ({}) => {
  const { control, handleSubmit } = useForm<IPromoSubscribingForm>({
    mode: 'onChange',
  });

  const { mutate } = useMutation({
    mutationFn: async (values: IPromoSubscribingForm) => {
      console.log('values', values);
      // await Api.instance.cart.sendCartFull({
      //   name: values.name,
      //   phone: values.phone,
      // });
    },
  });

  const handleSubmitForm = React.useCallback(
    (data: IPromoSubscribingForm) => {
      mutate(data);
    },
    [mutate],
  );

  return (
    <div className={styles.SubscribeToPromoForm}>
      <div className={styles.Text}>
        <Text level="s13h18w500">
          Будьте всегда в курсе о новинках в Мире алкоголя а так же о всех
          действующих и будущих акциях магазина Виноград не виноват, и не
          забудьте про секретные рассылки о закрытых распродажах и
          лимитированной продукции.
        </Text>
      </div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Input
          control={control}
          name="email"
          rules={{ required: true }}
          placeholder="Электронная почта"
        />
        <Button color="orange-fill" type="submit" stretched>
          Подписаться на акции и новости
        </Button>
      </form>
    </div>
  );
};
export default SubscribeToPromoForm;
