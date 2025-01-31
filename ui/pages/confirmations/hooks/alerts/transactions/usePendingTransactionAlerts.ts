import {
  TransactionMeta,
  TransactionType,
} from '@metamask/transaction-controller';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RowAlertKey } from '../../../../../components/app/confirm/info/row/constants';
import { Alert } from '../../../../../ducks/confirm-alerts/confirm-alerts';
import { Severity } from '../../../../../helpers/constants/design-system';
import { useI18nContext } from '../../../../../hooks/useI18nContext';
import {
  currentConfirmationSelector,
  submittedPendingTransactionsSelector,
} from '../../../../../selectors';
import { REDESIGN_DEV_TRANSACTION_TYPES } from '../../../utils';

export function usePendingTransactionAlerts(): Alert[] {
  const t = useI18nContext();
  const currentConfirmation = useSelector(currentConfirmationSelector);
  const { type } = currentConfirmation ?? ({} as TransactionMeta);
  const pendingTransactions = useSelector(submittedPendingTransactionsSelector);

  const isValidType = REDESIGN_DEV_TRANSACTION_TYPES.includes(
    type as TransactionType,
  );

  const hasPendingTransactions =
    isValidType && Boolean(pendingTransactions.length);

  return useMemo(() => {
    if (!hasPendingTransactions) {
      return [];
    }

    return [
      {
        field: RowAlertKey.Speed,
        key: 'pendingTransactions',
        message: t('alertMessagePendingTransactions'),
        reason: t('alertReasonPendingTransactions'),
        severity: Severity.Warning,
      },
    ];
  }, [hasPendingTransactions]);
}
