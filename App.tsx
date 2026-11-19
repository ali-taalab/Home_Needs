import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { categoryById } from './src/catalog';
import { BasketScreen, CategoryScreen, ListDetailScreen, ListsScreen, ShopScreen } from './src/screens';
import { StoreProvider, useStore } from './src/store';
import { colors } from './src/ui';

type Tab = 'shop' | 'basket' | 'lists';

function Main() {
  const store = useStore();
  const [tab, setTab] = useState<Tab>('shop');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [listId, setListId] = useState<string | null>(null);

  const openList = listId ? store.lists.find((l) => l.id === listId) : undefined;
  const inDetail = (tab === 'shop' && !!categoryId) || (tab === 'lists' && !!openList);

  const back = () => {
    if (tab === 'shop' && categoryId) setCategoryId(null);
    else if (tab === 'lists' && openList) setListId(null);
    else if (tab !== 'shop') setTab('shop');
    else return false;
    return true;
  };

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', back);
    return () => sub.remove();
  });

  if (!store.loaded) {
    return (
      <View style={[styles.flex, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const basketCount = Object.keys(store.basket).length;
  let title = 'Home Needs';
  if (tab === 'shop' && categoryId) title = `${categoryById(categoryId)?.emoji} ${categoryById(categoryId)?.name}`;
  if (tab === 'basket') title = 'My Basket';
  if (tab === 'lists') title = openList ? openList.title : 'Shopping Checklists';

  return (
    <SafeAreaView style={styles.flex} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        {inDetail ? (
          <Pressable onPress={back} hitSlop={12} style={{ marginRight: 8 }}>
            <Text style={styles.back}>‹</Text>
          </Pressable>
        ) : null}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.flex}>
        {tab === 'shop' && (categoryId ? <CategoryScreen categoryId={categoryId} /> : <ShopScreen openCategory={setCategoryId} />)}
        {tab === 'basket' && (
          <BasketScreen
            goShop={() => setTab('shop')}
            onCreated={(id) => {
              setListId(id);
              setTab('lists');
            }}
          />
        )}
        {tab === 'lists' &&
          (openList ? (
            <ListDetailScreen list={openList} onDeleted={() => setListId(null)} onEdit={() => setTab('basket')} />
          ) : (
            <ListsScreen openList={setListId} goShop={() => setTab('shop')} />
          ))}
      </View>

      <View style={styles.tabs}>
        {(
          [
            ['shop', '🏪', 'Shop'],
            ['basket', '🧺', 'Basket'],
            ['lists', '✅', 'Checklists'],
          ] as const
        ).map(([key, icon, label]) => (
          <Pressable
            key={key}
            style={styles.tab}
            onPress={() => {
              if (tab === key) {
                setCategoryId(null);
                setListId(null);
              }
              setTab(key);
            }}
          >
            <View>
              <Text style={[styles.tabIcon, tab !== key && { opacity: 0.45 }]}>{icon}</Text>
              {key === 'basket' && basketCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeTxt}>{basketCount}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.tabLabel, tab === key && { color: colors.primary }]}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <View style={[styles.flex, { backgroundColor: colors.bg }]}>
          <StatusBar style="dark" />
          <Main />
        </View>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.card, borderBottomWidth: 1, borderColor: colors.line },
  back: { fontSize: 32, color: colors.primary, lineHeight: 32, marginTop: -4 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, flex: 1 },
  tabs: { flexDirection: 'row', borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.card, paddingTop: 6, paddingBottom: 4 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  tabIcon: { fontSize: 22 },
  tabLabel: { fontSize: 12, color: colors.sub, marginTop: 2, fontWeight: '600' },
  badge: { position: 'absolute', top: -4, right: -12, backgroundColor: colors.danger, borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  badgeTxt: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
