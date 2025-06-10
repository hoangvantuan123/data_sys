import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_payrolls')
export class HrPayroll {
    @PrimaryGeneratedColumn()
    id: number;  

    @Column({ name: 'pb_ym', nullable: true })
    pb_ym: string;  // Period Year Month

    @Column({ name: 'yy', nullable: true })
    yy: number;  // Year

    @Column({ name: 'mm', nullable: true })
    mm: number;  // Month

    @Column({ name: 'emp_seq' , nullable: true})
    emp_seq: number;  // Employee Sequence

    @Column({ name: 'emp_id' , nullable: true})
    emp_id: string;  // Employee ID

    @Column({ name: 'emp_name' , nullable: true})
    emp_name: string;  // Employee Name

    @Column({ name: 'dept_nm', nullable: true })
    dept_nm: string;  // Department Name

    @Column({ name: 'jp_nm' , nullable: true})
    jp_nm: string;  // Job Position Name

    @Column({ name: 'pb_name', nullable: true })
    pb_name: string;  // Pb Name

    @Column({ name: 'pt_name_1', nullable: true })
    pt_name_1: string;  // Point Name 1

    @Column({ name: 'pt_name_2', nullable: true })
    pt_name_2: string;  // Point Name 2

    @Column({ name: 'pt_name_3', nullable: true })
    pt_name_3: string;  // Point Name 3

    @Column({ name: 'amt_1', type: 'float', nullable: true })
    amt_1: number;  // Amount 1

    @Column({ name: 'amt_2', type: 'float', nullable: true })
    amt_2: number;  // Amount 2

    @Column({ name: 'amt_3', type: 'float', nullable: true })
    amt_3: number;  // Amount 3

    @Column({ name: 'amt_4', type: 'float', nullable: true })
    amt_4: number;  // Amount 4

    @Column({ name: 'amt_5', type: 'float', nullable: true })
    amt_5: number;  // Amount 5

    @Column({ name: 'amt_6', type: 'float', nullable: true })
    amt_6: number;  // Amount 6

    @Column({ name: 'amt_7', type: 'float', nullable: true })
    amt_7: number;  // Amount 7

    @Column({ name: 'amt_8', type: 'float', nullable: true })
    amt_8: number;  // Amount 8

    @Column({ name: 'amt_9', type: 'float', nullable: true })
    amt_9: number;  // Amount 9

    @Column({ name: 'amt_10', type: 'float', nullable: true })
    amt_10: number;  // Amount 10

    @Column({ name: 'amt_11', type: 'float', nullable: true })
    amt_11: number;  // Amount 11

    @Column({ name: 'amt_12', type: 'float', nullable: true })
    amt_12: number;  // Amount 12

    @Column({ name: 'amt_13', type: 'float', nullable: true })
    amt_13: number;  // Amount 13

    @Column({ name: 'amt_14', type: 'float', nullable: true })
    amt_14: number;  // Amount 14

    @Column({ name: 'amt_15', type: 'float', nullable: true })
    amt_15: number;  // Amount 15

    @Column({ name: 'amt_16', type: 'float', nullable: true })
    amt_16: number;  // Amount 16

    @Column({ name: 'amt_17', type: 'float', nullable: true })
    amt_17: number;  // Amount 17

    @Column({ name: 'amt_18', type: 'float', nullable: true })
    amt_18: number;  // Amount 18

    @Column({ name: 'amt_19', type: 'float', nullable: true })
    amt_19: number;  // Amount 19

    @Column({ name: 'amt_20', type: 'float', nullable: true })
    amt_20: number;  // Amount 20

    @Column({ name: 'amt_21', type: 'float', nullable: true })
    amt_21: number;  // Amount 21

    @Column({ name: 'amt_22', type: 'float', nullable: true })
    amt_22: number;  // Amount 22

    @Column({ name: 'amt_23', type: 'float', nullable: true })
    amt_23: number;  // Amount 23

    @Column({ name: 'amt_24', type: 'float', nullable: true })
    amt_24: number;  // Amount 24

    @Column({ name: 'amt_25', type: 'float', nullable: true })
    amt_25: number;  // Amount 25

    @Column({ name: 'amt_26', type: 'float', nullable: true })
    amt_26: number;  // Amount 26

    @Column({ name: 'amt_27', type: 'float', nullable: true })
    amt_27: number;  // Amount 27

    @Column({ name: 'amt_28', type: 'float', nullable: true })
    amt_28: number;  // Amount 28

    @Column({ name: 'amt_29', type: 'float', nullable: true })
    amt_29: number;  // Amount 29

    @Column({ name: 'amt_30', type: 'float', nullable: true })
    amt_30: number;  // Amount 30

    @Column({ name: 'amt_31', type: 'float', nullable: true })
    amt_31: number;  // Amount 31

    @Column({ name: 'amt_32', type: 'float', nullable: true })
    amt_32: number;  // Amount 32

    @Column({ name: 'amt_33', type: 'float', nullable: true })
    amt_33: number;  // Amount 33

    @Column({ name: 'amt_34', type: 'float', nullable: true })
    amt_34: number;  // Amount 34

    @Column({ name: 'amt_35', type: 'float', nullable: true })
    amt_35: number;  // Amount 35

    @Column({ name: 'amt_36', type: 'float', nullable: true })
    amt_36: number;  // Amount 36

    @Column({ name: 'amt_37', type: 'float', nullable: true })
    amt_37: number;  // Amount 37

    @Column({ name: 'amt_38', type: 'float', nullable: true })
    amt_38: number;  // Amount 38

    @Column({ name: 'amt_39', type: 'float', nullable: true })
    amt_39: number;  // Amount 39

    @Column({ name: 'amt_40', type: 'float', nullable: true })
    amt_40: number;  // Amount 40

    @Column({ name: 'amt_41', type: 'float', nullable: true })
    amt_41: number;  // Amount 41

    @Column({ name: 'amt_42', type: 'float', nullable: true })
    amt_42: number;  // Amount 42

    @Column({ name: 'amt_43', type: 'float', nullable: true })
    amt_43: number;  // Amount 43

    @Column({ name: 'amt_44', type: 'float', nullable: true })
    amt_44: number;  // Amount 44

    @Column({ name: 'amt_45', type: 'float', nullable: true })
    amt_45: number;  // Amount 45

    @Column({ name: 'amt_46', type: 'float', nullable: true })
    amt_46: number;  // Amount 46

    @Column({ name: 'amt_47', type: 'float', nullable: true })
    amt_47: number;  // Amount 47

    @Column({ name: 'amt_48', type: 'float', nullable: true })
    amt_48: number;  // Amount 48

    @Column({ name: 'amt_49', type: 'float', nullable: true })
    amt_49: number;  // Amount 49

    @Column({ name: 'amt_50', type: 'float', nullable: true })
    amt_50: number;  // Amount 50


}
