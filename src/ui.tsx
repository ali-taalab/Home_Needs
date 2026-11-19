import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
