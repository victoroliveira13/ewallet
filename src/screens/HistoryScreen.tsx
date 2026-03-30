import React, { useState, useMemo } from 'react';
import { View, Text, SectionList, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransactionItem } from '../components/TransactionItem';
import { SearchBar } from '../components/SearchBar';
import { useWalletStore } from '../store/useWalletStore';
import { groupTransactionsByDate } from '../utils/groupTransactionsByDate';
import { TRANSACTION_FILTERS } from '../constants/ui';
import type { TransactionFilter } from '../constants/ui';

type DatePickerTarget = 'from' | 'to' | null;

const HistoryScreen: React.FC = () => {
  const { transactions } = useWalletStore();

  // --- filter state ---
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [datePickerTarget, setDatePickerTarget] = useState<DatePickerTarget>(null);

  const hasActiveFilters =
    searchQuery.length > 0 ||
    dateFrom !== null ||
    dateTo !== null ||
    minAmount.length > 0 ||
    maxAmount.length > 0;

  function clearFilters() {
    setSearchQuery('');
    setDateFrom(null);
    setDateTo(null);
    setMinAmount('');
    setMaxAmount('');
    setActiveFilter('All');
  }

  // --- derived data (memoized) ---
  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const min = minAmount ? parseFloat(minAmount) : null;
    const max = maxAmount ? parseFloat(maxAmount) : null;

    return transactions.filter((tx) => {
      if (activeFilter === 'Income' && tx.type !== 'credit') return false;
      if (activeFilter === 'Expense' && tx.type !== 'debit') return false;

      if (
        query &&
        !tx.title.toLowerCase().includes(query) &&
        !tx.subtitle.toLowerCase().includes(query)
      )
        return false;

      const txDate = new Date(tx.timestamp);
      if (dateFrom && txDate < dateFrom) return false;
      if (dateTo) {
        const endOfDay = new Date(dateTo);
        endOfDay.setHours(23, 59, 59, 999);
        if (txDate > endOfDay) return false;
      }

      const absAmount = Math.abs(tx.amount);
      if (min !== null && absAmount < min) return false;
      if (max !== null && absAmount > max) return false;

      return true;
    });
  }, [transactions, activeFilter, searchQuery, dateFrom, dateTo, minAmount, maxAmount]);

  const sections = useMemo(() => groupTransactionsByDate(filtered), [filtered]);

  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'debit')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),
    [transactions]
  );

  function formatDate(date: Date | null): string {
    if (!date) return 'Any';
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  }

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View className='px-4 pt-4 pb-2'>
              <Text className='text-white text-2xl font-bold'>Transaction History</Text>
              <Text className='text-text-secondary text-sm mt-1'>All your transactions</Text>
            </View>

            {/* Summary cards */}
            <View className='flex-row px-4 mt-4 gap-3'>
              <View className='flex-1 bg-surface rounded-2xl p-4'>
                <Text className='text-text-secondary text-xs mb-1'>Total Income</Text>
                <Text className='text-primary font-bold text-lg'>+${totalIncome.toFixed(2)}</Text>
              </View>
              <View className='flex-1 bg-surface rounded-2xl p-4'>
                <Text className='text-text-secondary text-xs mb-1'>Total Expense</Text>
                <Text className='text-danger font-bold text-lg'>-${totalExpense.toFixed(2)}</Text>
              </View>
            </View>

            {/* Search bar */}
            <View className='px-4 mt-5'>
              <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
            </View>

            {/* Filter row: type pills + advanced toggle */}
            <View className='flex-row items-center px-4 mt-4 gap-2'>
              {TRANSACTION_FILTERS.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === filter ? 'bg-primary' : 'bg-surface'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      activeFilter === filter ? 'text-background' : 'text-text-secondary'
                    }`}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}

              <View className='flex-1' />

              <TouchableOpacity
                onPress={() => setShowAdvanced((v) => !v)}
                className={`px-4 py-2 rounded-full flex-row items-center gap-1 ${
                  showAdvanced ? 'bg-primary' : 'bg-surface'
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${showAdvanced ? 'text-background' : 'text-text-secondary'}`}
                >
                  Filters {showAdvanced ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Advanced filters panel */}
            {showAdvanced && (
              <View className='mx-4 mt-3 bg-surface rounded-2xl p-4 gap-3'>
                {/* Date range */}
                <Text className='text-text-secondary text-xs font-semibold uppercase tracking-widest'>
                  Date range
                </Text>
                <View className='flex-row gap-3'>
                  <TouchableOpacity
                    onPress={() => setDatePickerTarget('from')}
                    className='flex-1 bg-surface-2 rounded-xl px-3 py-2.5'
                  >
                    <Text className='text-text-secondary text-xs mb-0.5'>From</Text>
                    <Text
                      className={`text-sm font-semibold ${dateFrom ? 'text-white' : 'text-text-secondary'}`}
                    >
                      {formatDate(dateFrom)}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setDatePickerTarget('to')}
                    className='flex-1 bg-surface-2 rounded-xl px-3 py-2.5'
                  >
                    <Text className='text-text-secondary text-xs mb-0.5'>To</Text>
                    <Text
                      className={`text-sm font-semibold ${dateTo ? 'text-white' : 'text-text-secondary'}`}
                    >
                      {formatDate(dateTo)}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Amount range */}
                <Text className='text-text-secondary text-xs font-semibold uppercase tracking-widest mt-1'>
                  Amount range ($)
                </Text>
                <View className='flex-row gap-3'>
                  <View className='flex-1 bg-surface-2 rounded-xl px-3 py-2.5'>
                    <Text className='text-text-secondary text-xs mb-0.5'>Min</Text>
                    <TextInput
                      className='text-white text-sm p-0'
                      value={minAmount}
                      onChangeText={setMinAmount}
                      placeholder='0.00'
                      placeholderTextColor='#6B7280'
                      keyboardType='decimal-pad'
                    />
                  </View>
                  <View className='flex-1 bg-surface-2 rounded-xl px-3 py-2.5'>
                    <Text className='text-text-secondary text-xs mb-0.5'>Max</Text>
                    <TextInput
                      className='text-white text-sm p-0'
                      value={maxAmount}
                      onChangeText={setMaxAmount}
                      placeholder='9999.99'
                      placeholderTextColor='#6B7280'
                      keyboardType='decimal-pad'
                    />
                  </View>
                </View>

                {/* Clear button */}
                {hasActiveFilters && (
                  <TouchableOpacity
                    onPress={clearFilters}
                    className='bg-danger/20 rounded-xl py-2.5 items-center mt-1'
                  >
                    <Text className='text-danger text-sm font-semibold'>Clear all filters</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Results count when filtering */}
            {hasActiveFilters && (
              <View className='px-4 mt-3'>
                <Text className='text-text-secondary text-xs'>
                  {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
                </Text>
              </View>
            )}
          </>
        }
        renderSectionHeader={({ section: { title } }) => (
          <View className='px-4 pt-6 pb-2'>
            <Text className='text-text-secondary text-xs font-semibold uppercase tracking-widest'>
              {title}
            </Text>
          </View>
        )}
        renderItem={({ item, index, section }) => (
          <View className='mx-4'>
            <View
              className={`bg-surface overflow-hidden ${index === 0 ? 'rounded-t-2xl' : ''} ${
                index === section.data.length - 1 ? 'rounded-b-2xl' : ''
              }`}
            >
              <TransactionItem transaction={item} />
              {index < section.data.length - 1 && <View className='h-px bg-surface-2 mx-4' />}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className='py-12 items-center'>
            <Text className='text-4xl mb-3'>📭</Text>
            <Text className='text-text-secondary'>No transactions found</Text>
            {hasActiveFilters && (
              <TouchableOpacity onPress={clearFilters} className='mt-4'>
                <Text className='text-primary text-sm font-semibold'>Clear filters</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        ListFooterComponent={<View className='h-8' />}
      />

      {/* DateTimePicker modal */}
      {datePickerTarget !== null && (
        <DateTimePicker
          value={datePickerTarget === 'from' ? (dateFrom ?? new Date()) : (dateTo ?? new Date())}
          mode='date'
          display='default'
          maximumDate={new Date()}
          onChange={(_, selectedDate) => {
            if (selectedDate) {
              if (datePickerTarget === 'from') setDateFrom(selectedDate);
              else setDateTo(selectedDate);
            }
            setDatePickerTarget(null);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;
