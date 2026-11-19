import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, ScrollView, SectionList, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { CATEGORIES, categoryById } from './catalog';
import { listToText, ShoppingList, useStore } from './store';
import { Button, colors, ProductRow } from './ui';

/* ---------------- Shop: categories + search ---------------- */

export function ShopScreen({ openCategory }: { openCategory: (id: string) => void }) {
  const store = useStore();
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const results = useMemo(() => (q ? store.products.filter((p) => p.name.toLowerCase().includes(q)) : []), [q, store.products]);
  const countByCat = useMemo(() => {
    const m: Record<string, number> = {};
    for (const pid of Object.keys(store.basket)) {
      const p = store.productById.get(pid);
      if (p) m[p.categoryId] = (m[p.categoryId] ?? 0) + 1;
    }
    return m;
  }, [store.basket, store.productById]);

  return (
    <View style={{ flex: 1 }}>
      <View style={st.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="🔍  Search items…"
          placeholderTextColor={colors.sub}
          style={st.search}
          clearButtonMode="while-editing"
        />
      </View>
      {q ? (
        <FlatList
          contentContainerStyle={st.pad}
          data={results}
          keyExtractor={(p) => p.id}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<Text style={st.empty}>No items found. Open a category to add “{query.trim()}” as your own item.</Text>}
          renderItem={({ item }) => (
            <ProductRow
              product={item}
              subtitle={categoryById(item.categoryId)?.name}
              qty={store.basket[item.id] ?? 0}
              onChange={(n) => store.setQty(item.id, n)}
            />
          )}
        />
      ) : (
        <FlatList
          contentContainerStyle={st.pad}
          data={CATEGORIES}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          keyExtractor={(c) => c.id}
          renderItem={({ item }) => (
            <Pressable style={({ pressed }) => [st.cat, { backgroundColor: item.color }, pressed && { opacity: 0.7 }]} onPress={() => openCategory(item.id)}>
              {countByCat[item.id] ? (
                <View style={st.catBadge}>
                  <Text style={st.badgeTxt}>{countByCat[item.id]}</Text>
                </View>
              ) : null}
              <Text style={st.catEmoji}>{item.emoji}</Text>
              <Text style={st.catName}>{item.name}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

export function CategoryScreen({ categoryId }: { categoryId: string }) {
  const store = useStore();
  const [newName, setNewName] = useState('');
  const items = store.products.filter((p) => p.categoryId === categoryId);

  const add = () => {
    if (!newName.trim()) return;
    store.addCustomProduct(newName, categoryId);
    setNewName('');
  };

  return (
    <FlatList
      contentContainerStyle={st.pad}
      data={items}
      keyExtractor={(p) => p.id}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <ProductRow
          product={item}
          qty={store.basket[item.id] ?? 0}
          onChange={(n) => store.setQty(item.id, n)}
          subtitle={item.custom ? 'My item · long-press to delete' : undefined}
          onLongPress={
            item.custom
              ? () =>
                  Alert.alert('Delete item', `Remove “${item.name}” from this category?`, [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: () => store.removeCustomProduct(item.id) },
                  ])
              : undefined
          }
        />
      )}
      ListFooterComponent={
        <View style={st.addRow}>
          <TextInput
            value={newName}
            onChangeText={setNewName}
            placeholder="Add your own item…"
            placeholderTextColor={colors.sub}
            style={[st.search, { flex: 1 }]}
            onSubmitEditing={add}
            returnKeyType="done"
          />
          <Pressable style={st.addBtn} onPress={add}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Add</Text>
          </Pressable>
        </View>
      }
    />
  );
}

/* ---------------- Basket ---------------- */

export function BasketScreen({ onCreated, goShop }: { onCreated: (listId: string) => void; goShop: () => void }) {
  const store = useStore();
  const sections = useMemo(() => {
    const byCat: Record<string, { id: string; qty: number }[]> = {};
    for (const [pid, qty] of Object.entries(store.basket)) {
      const p = store.productById.get(pid);
      if (!p) continue;
      (byCat[p.categoryId] ??= []).push({ id: pid, qty });
    }
    return CATEGORIES.filter((c) => byCat[c.id]).map((c) => ({ title: `${c.emoji} ${c.name}`, data: byCat[c.id] }));
  }, [store.basket, store.productById]);

  const total = Object.keys(store.basket).length;

  if (!total) {
    return (
      <View style={st.center}>
        <Text style={{ fontSize: 56 }}>🧺</Text>
        <Text style={st.emptyTitle}>Your basket is empty</Text>
        <Text style={st.empty}>Browse the categories and add what your home needs.</Text>
        <View style={{ flexDirection: 'row', marginTop: 16, width: 220 }}>
          <Button title="Start shopping" onPress={goShop} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        contentContainerStyle={st.pad}
        sections={sections}
        keyExtractor={(i) => i.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => <Text style={st.section}>{section.title}</Text>}
        renderItem={({ item }) => {
          const p = store.productById.get(item.id)!;
          return <ProductRow product={p} qty={item.qty} onChange={(n) => store.setQty(item.id, n)} />;
        }}
      />
      <View style={st.footer}>
        <Button
          title="Clear"
          variant="danger"
          onPress={() =>
            Alert.alert('Clear basket', 'Remove all items from the basket?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Clear', style: 'destructive', onPress: store.clearBasket },
            ])
          }
        />
        <View style={{ width: 10 }} />
        <View style={{ flex: 2.2, flexDirection: 'row' }}>
          <Button
            title={`✅ Create checklist (${total})`}
            onPress={() => {
              const id = store.createListFromBasket();
              if (id) onCreated(id);
            }}
          />
        </View>
      </View>
    </View>
  );
}

/* ---------------- Lists ---------------- */

export function ListsScreen({ openList, goShop }: { openList: (id: string) => void; goShop: () => void }) {
  const store = useStore();
  if (!store.lists.length) {
    return (
      <View style={st.center}>
        <Text style={{ fontSize: 56 }}>📋</Text>
        <Text style={st.emptyTitle}>No checklists yet</Text>
        <Text style={st.empty}>Fill your basket, then tap “Create checklist” to get a list to tick off at the supermarket.</Text>
        <View style={{ flexDirection: 'row', marginTop: 16, width: 220 }}>
          <Button title="Start shopping" onPress={goShop} />
        </View>
      </View>
    );
  }
  return (
    <FlatList
      contentContainerStyle={st.pad}
      data={store.lists}
      keyExtractor={(l) => l.id}
      renderItem={({ item }) => {
        const done = item.items.filter((i) => i.checked).length;
        const pct = item.items.length ? done / item.items.length : 0;
        return (
          <Pressable style={({ pressed }) => [st.listCard, pressed && { opacity: 0.7 }]} onPress={() => openList(item.id)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={st.listTitle}>{item.title}</Text>
              <Text style={st.sub}>
                {done}/{item.items.length}
              </Text>
            </View>
            <View style={st.progress}>
              <View style={[st.progressFill, { width: `${pct * 100}%` }]} />
            </View>
            <Text style={st.sub} numberOfLines={1}>
              {item.items.map((i) => i.name).join(', ')}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}

export function ListDetailScreen({ list, onDeleted, onEdit }: { list: ShoppingList; onDeleted: () => void; onEdit: () => void }) {
  const store = useStore();
  const done = list.items.filter((i) => i.checked).length;

  const sections = useMemo(() => {
    const out: { title: string; data: ShoppingList['items'] }[] = [];
    for (const it of list.items) {
      const c = categoryById(it.categoryId);
      const title = `${c?.emoji ?? '📝'} ${c?.name ?? 'Other'}`;
      const last = out[out.length - 1];
      if (last && last.title === title) last.data.push(it);
      else out.push({ title, data: [it] });
    }
    return out;
  }, [list.items]);

  const share = () => Share.share({ message: listToText(list), title: list.title }).catch(() => {});

  const more = () =>
    Alert.alert(list.title, undefined, [
      { text: 'Uncheck all', onPress: () => store.resetList(list.id) },
      {
        text: 'Add unchecked items to basket',
        onPress: () => {
          store.loadListIntoBasket(list.id, true);
          onEdit();
        },
      },
      {
        text: 'Delete checklist',
        style: 'destructive',
        onPress: () => {
          store.deleteList(list.id);
          onDeleted();
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);

  return (
    <View style={{ flex: 1 }}>
      <View style={[st.pad, { paddingBottom: 0 }]}>
        <Text style={st.sub}>
          {done} of {list.items.length} picked up {done === list.items.length ? '🎉' : ''}
        </Text>
        <View style={st.progress}>
          <View style={[st.progressFill, { width: `${list.items.length ? (done / list.items.length) * 100 : 0}%` }]} />
        </View>
      </View>
      <SectionList
        contentContainerStyle={st.pad}
        sections={sections}
        keyExtractor={(i) => i.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => <Text style={st.section}>{section.title}</Text>}
        renderItem={({ item }) => (
          <Pressable style={st.checkRow} onPress={() => store.toggleItem(list.id, item.id)} accessibilityRole="checkbox" accessibilityState={{ checked: item.checked }}>
            <View style={[st.box, item.checked && st.boxOn]}>{item.checked ? <Text style={st.tick}>✓</Text> : null}</View>
            <Text style={{ fontSize: 22 }}>{item.emoji}</Text>
            <Text style={[st.checkName, item.checked && st.checkedName]}>{item.name}</Text>
            {item.qty > 1 ? <Text style={[st.qtyPill, item.checked && { opacity: 0.4 }]}>× {item.qty}</Text> : null}
          </Pressable>
        )}
      />
      <View style={st.footer}>
        <Button title="More…" variant="ghost" onPress={more} />
        <View style={{ width: 10 }} />
        <View style={{ flex: 2.2, flexDirection: 'row' }}>
          <Button title="📤 Share / Export list" onPress={share} />
        </View>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  pad: { padding: 16 },
  searchWrap: { paddingHorizontal: 16, paddingTop: 12 },
  search: { backgroundColor: colors.card, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, borderWidth: 1, borderColor: colors.line, color: colors.text },
  cat: { flex: 1, aspectRatio: 1.15, borderRadius: 18, padding: 14, marginBottom: 12, justifyContent: 'space-between' },
  catEmoji: { fontSize: 40 },
  catName: { fontSize: 15, fontWeight: '700', color: colors.text },
  catBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: colors.primary, borderRadius: 12, minWidth: 24, height: 24, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  badgeTxt: { color: '#fff', fontWeight: '700', fontSize: 12 },
  addRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  addBtn: { backgroundColor: colors.primary, borderRadius: 12, paddingHorizontal: 18, justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 12 },
  empty: { color: colors.sub, textAlign: 'center', marginTop: 6, lineHeight: 20 },
  section: { fontSize: 14, fontWeight: '700', color: colors.sub, marginTop: 10, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  footer: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.card },
  listCard: { backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.line, gap: 8 },
  listTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
  sub: { color: colors.sub, fontSize: 13 },
  progress: { height: 6, backgroundColor: colors.line, borderRadius: 3, overflow: 'hidden', marginTop: 6 },
  progressFill: { height: 6, backgroundColor: colors.primary },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, padding: 14, borderRadius: 14, marginBottom: 8, borderWidth: 1, borderColor: colors.line },
  box: { width: 26, height: 26, borderRadius: 7, borderWidth: 2, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  boxOn: { backgroundColor: colors.primary },
  tick: { color: '#fff', fontWeight: '900', fontSize: 16 },
  checkName: { flex: 1, fontSize: 16, color: colors.text },
  checkedName: { textDecorationLine: 'line-through', color: colors.sub },
  qtyPill: { backgroundColor: colors.primarySoft, color: colors.primary, fontWeight: '700', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10, overflow: 'hidden' },
});
