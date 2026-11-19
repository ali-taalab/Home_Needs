import React, { useEffect, useState } from 'react';
import { Alert, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Product } from './catalog';

export const colors = {
  bg: '#F6F7F4',
  card: '#FFFFFF',
  text: '#1D2420',
  sub: '#6B746F',
  line: '#E4E7E2',
  primary: '#1F8A4C',
  primarySoft: '#E3F4E9',
  danger: '#C8433A',
};

export type MenuOption = { text: string; style?: 'cancel' | 'destructive'; onPress?: () => void };
type Menu = { title: string; message?: string; options: MenuOption[] };
let showMenuImpl: ((m: Menu | null) => void) | null = null;

/** Native Alert on phones; an in-app sheet on the web (where Alert does nothing). */
export function showMenu(title: string, message: string | undefined, options: MenuOption[]) {
  if (Platform.OS !== 'web') Alert.alert(title, message, options);
  else showMenuImpl?.({ title, message, options });
}

export function MenuHost() {
  const [menu, setMenu] = useState<Menu | null>(null);
  useEffect(() => {
    showMenuImpl = setMenu;
    return () => {
      showMenuImpl = null;
    };
  }, []);
  if (!menu) return null;
  const close = () => setMenu(null);
  return (
    <Modal transparent animationType="fade" visible onRequestClose={close}>
      <Pressable style={s.backdrop} onPress={close}>
        <Pressable style={s.sheet} onPress={() => {}}>
          <Text style={s.sheetTitle}>{menu.title}</Text>
          {menu.message ? (
            <ScrollView style={{ maxHeight: 320 }}>
              <Text selectable style={s.sheetMsg}>
                {menu.message}
              </Text>
            </ScrollView>
          ) : null}
          {menu.options.map((o) => (
            <Pressable
              key={o.text}
              style={({ pressed }) => [s.sheetBtn, pressed && { opacity: 0.6 }]}
              onPress={() => {
                close();
                o.onPress?.();
              }}
            >
              <Text style={[s.sheetBtnTxt, o.style === 'destructive' && { color: colors.danger }, o.style === 'cancel' && { color: colors.sub, fontWeight: '500' }]}>{o.text}</Text>
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function Stepper({ qty, onChange }: { qty: number; onChange: (q: number) => void }) {
  if (qty === 0) {
    return (
      <Pressable style={s.addBtn} onPress={() => onChange(1)} hitSlop={8} accessibilityLabel="Add">
        <Text style={s.addTxt}>＋ Add</Text>
      </Pressable>
    );
  }
  return (
    <View style={s.stepper}>
      <Pressable style={s.stepBtn} onPress={() => onChange(qty - 1)} hitSlop={6} accessibilityLabel="Decrease">
        <Text style={s.stepTxt}>−</Text>
      </Pressable>
      <Text style={s.qty}>{qty}</Text>
      <Pressable style={s.stepBtn} onPress={() => onChange(qty + 1)} hitSlop={6} accessibilityLabel="Increase">
        <Text style={s.stepTxt}>＋</Text>
      </Pressable>
    </View>
  );
}

export function ProductRow({
  product,
  qty,
  onChange,
  subtitle,
  onLongPress,
}: {
  product: Product;
  qty: number;
  onChange: (q: number) => void;
  subtitle?: string;
  onLongPress?: () => void;
}) {
  return (
    <Pressable style={[s.row, qty > 0 && s.rowActive]} onPress={() => qty === 0 && onChange(1)} onLongPress={onLongPress}>
      <Text style={s.emoji}>{product.emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={s.name}>{product.name}</Text>
        {subtitle ? <Text style={s.sub}>{subtitle}</Text> : null}
      </View>
      <Stepper qty={qty} onChange={onChange} />
    </Pressable>
  );
}

export function Button({ title, onPress, variant = 'primary', disabled }: { title: string; onPress: () => void; variant?: 'primary' | 'ghost' | 'danger'; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [s.btn, variant !== 'primary' && s.btnGhost, disabled && { opacity: 0.4 }, pressed && { opacity: 0.75 }]}
    >
      <Text style={[s.btnTxt, variant === 'ghost' && { color: colors.primary }, variant === 'danger' && { color: colors.danger }]}>{title}</Text>
    </Pressable>
  );
}

export const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.card, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 32, gap: 4 },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 6 },
  sheetMsg: { fontSize: 15, color: colors.text, lineHeight: 22, marginBottom: 8 },
  sheetBtn: { paddingVertical: 14, borderTopWidth: 1, borderColor: colors.line },
  sheetBtnTxt: { fontSize: 16, color: colors.primary, fontWeight: '600', textAlign: 'center' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 12,
  },
  rowActive: { borderColor: colors.primary, backgroundColor: '#FAFFFB' },
  emoji: { fontSize: 26, width: 34, textAlign: 'center' },
  name: { fontSize: 16, color: colors.text, fontWeight: '500' },
  sub: { fontSize: 12, color: colors.sub, marginTop: 2 },
  addBtn: { backgroundColor: colors.primarySoft, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  addTxt: { color: colors.primary, fontWeight: '700' },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, borderRadius: 20 },
  stepBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  stepTxt: { color: '#fff', fontSize: 18, fontWeight: '700' },
  qty: { color: '#fff', fontWeight: '700', minWidth: 18, textAlign: 'center' },
  btn: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 14, alignItems: 'center', flex: 1 },
  btnGhost: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
